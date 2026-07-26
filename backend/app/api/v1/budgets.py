import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.budget_repo import BudgetRepository
from app.repositories.category_repo import CategoryRepository
from app.schemas.budget import BudgetCreate, BudgetOut, BudgetProgress, BudgetUpdate, PaginatedBudgets
from app.schemas.common import MessageResponse
from app.utils.pagination import paginate

router = APIRouter(prefix="/budgets", tags=["Budgets"])


def budget_to_out(b):
    return BudgetOut(
        id=str(b.id),
        category_id=str(b.category_id),
        monthly_limit=b.monthly_limit,
        month=b.month,
        spent=b.spent,
        created_at=b.created_at,
        updated_at=b.updated_at,
        category_name=b.category.name if b.category else None,
    )


@router.get("", response_model=PaginatedBudgets)
async def list_budgets(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    month: str | None = Query(None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = BudgetRepository(db)
    items, total = await repo.list_with_spent(user.id, page=page, size=size, month=month)
    return paginate([budget_to_out(b) for b in items], total, page, size)


@router.post("", response_model=BudgetOut)
async def create_budget(
    body: BudgetCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cat_repo = CategoryRepository(db)
    cat = None
    try:
        cat = await cat_repo.get(uuid.UUID(body.category_id))
    except Exception:
        pass

    if not cat:
        from sqlalchemy import select, func
        from app.models.category import Category
        KNOWN_CATS = {
            "6022df44-914f-4548-ab52-41a1267e3616": "Grocery",
            "fd38cb1c-e063-432f-83c4-f2990eb1a3c8": "Lifestyle",
            "cfe067c0-fbd5-4bd3-b731-50e1175894f2": "Food",
            "6ca9641b-5f7b-4fb3-9003-4ae3f73111dc": "Medicine",
            "803b7106-6f49-4f73-9b07-6efe01329d8e": "Transport",
            "ea7cdacb-3bf4-4123-91f4-00a676dac6df": "Entertainment",
            "65241923-a0da-42cc-ab74-c8f18194540c": "Utilities",
            "f0ded8d4-ebe5-451c-bdbd-c62c9dae6353": "Shopping",
        }
        name = KNOWN_CATS.get(str(body.category_id).lower(), "General")
        res = await db.execute(select(Category).where(func.lower(Category.name) == name.lower()))
        cat = res.scalar_one_or_none()
        if not cat:
            cat_uuid = uuid.UUID(body.category_id) if len(str(body.category_id)) == 36 else uuid.uuid4()
            cat = Category(id=cat_uuid, name=name, icon="category", color="#0066FF")
            db.add(cat)
            await db.commit()
            await db.refresh(cat)

    month = body.month or datetime.now(timezone.utc).strftime("%Y-%m")
    repo = BudgetRepository(db)
    
    existing, _ = await repo.list(page=1, size=1, user_id=user.id, category_id=cat.id, month=month)
    if existing:
        budget = await repo.update(existing[0].id, monthly_limit=body.monthly_limit)
    else:
        budget = await repo.create(
            user_id=user.id,
            category_id=cat.id,
            monthly_limit=body.monthly_limit,
            month=month,
        )
    if not budget.category:
        budget.category = cat
    budget.spent = await repo.get_current_month_spent(user.id, budget.category_id, budget.month)
    return budget_to_out(budget)


@router.patch("/{id}", response_model=BudgetOut)
async def update_budget(
    id: str,
    body: BudgetUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = BudgetRepository(db)
    budget = await repo.get(uuid.UUID(id))
    if not budget or budget.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")
    updated = await repo.update(
        uuid.UUID(id),
        monthly_limit=body.monthly_limit,
        category_id=uuid.UUID(body.category_id) if body.category_id else None,
    )
    updated.spent = await repo.get_current_month_spent(user.id, updated.category_id, updated.month)
    return budget_to_out(updated)


@router.delete("/{id}", response_model=MessageResponse)
async def delete_budget(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = BudgetRepository(db)
    budget = await repo.get(uuid.UUID(id))
    if not budget or budget.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")
    await repo.delete(uuid.UUID(id))
    return MessageResponse(message="Budget deleted")


@router.get("/{id}/progress", response_model=BudgetProgress)
async def get_budget_progress(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = BudgetRepository(db)
    budget = await repo.get(uuid.UUID(id))
    if not budget or budget.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")

    progress = await repo.get_progress(budget.id, user.id)
    if not progress:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")

    return BudgetProgress(
        budget=budget_to_out(budget),
        spent=progress["spent"],
        remaining=progress["remaining"],
        percentage=progress["percentage"],
        projected=progress["projected"],
    )
