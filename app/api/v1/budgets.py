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
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = BudgetRepository(db)
    items, total = await repo.list(page=page, size=size, user_id=user.id)
    return paginate([budget_to_out(b) for b in items], total, page, size)


@router.post("", response_model=BudgetOut)
async def create_budget(
    body: BudgetCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    cat_repo = CategoryRepository(db)
    cat = await cat_repo.get(uuid.UUID(body.category_id))
    if not cat:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    month = body.month or datetime.now(timezone.utc).strftime("%Y-%m")
    repo = BudgetRepository(db)
    budget = await repo.create(
        user_id=user.id,
        category_id=uuid.UUID(body.category_id),
        monthly_limit=body.monthly_limit,
        month=month,
    )
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
