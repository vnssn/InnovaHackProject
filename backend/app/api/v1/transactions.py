import uuid
from datetime import date as date_type, datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.transaction_repo import TransactionRepository
from app.schemas.common import MessageResponse
from app.schemas.transaction import (
    PaginatedTransactions,
    RecategorizeRequest,
    ReplayResponse,
    TimelineResponse,
    TransactionOut,
)
from app.utils.pagination import paginate

router = APIRouter(prefix="/transactions", tags=["Transactions"])


def transaction_to_out(t):
    return TransactionOut(
        id=str(t.id),
        merchant_id=str(t.merchant_id) if t.merchant_id else None,
        category_id=str(t.category_id) if t.category_id else None,
        provider=t.provider,
        amount=t.amount,
        description=t.description,
        status=t.status,
        payment_method=t.payment_method,
        reference_number=t.reference_number,
        remarks=t.remarks,
        transaction_date=t.transaction_date,
        created_at=t.created_at,
        merchant_name=t.merchant.name if t.merchant else None,
        category_name=t.category.name if t.category else None,
        city=t.merchant.city if t.merchant else None,
        locality=t.merchant.locality if t.merchant else None,
    )


@router.get("", response_model=PaginatedTransactions)
async def list_transactions(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    sort_by: str = "transaction_date",
    sort_order: str = "desc",
    search: str | None = None,
    merchant_id: str | None = None,
    category_id: str | None = None,
    provider: str | None = None,
    city: str | None = None,
    status: str | None = None,
    start_date: str | None = None,
    end_date: str | None = None,
    min_amount: float | None = None,
    max_amount: float | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = TransactionRepository(db)
    items, total = await repo.list_filtered(
        user_id=user.id,
        page=page,
        size=size,
        sort_by=sort_by,
        sort_order=sort_order,
        search=search,
        merchant_id=uuid.UUID(merchant_id) if merchant_id else None,
        category_id=uuid.UUID(category_id) if category_id else None,
        provider=provider,
        city=city,
        status=status,
        start_date=datetime.fromisoformat(start_date) if start_date else None,
        end_date=datetime.fromisoformat(end_date) if end_date else None,
        min_amount=min_amount,
        max_amount=max_amount,
    )
    return paginate([transaction_to_out(t) for t in items], total, page, size)


@router.get("/timeline", response_model=TimelineResponse)
async def get_timeline(
    group_by: str = Query("daily", pattern="^(daily|weekly|monthly|yearly)$"),
    start_date: str | None = None,
    end_date: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = TransactionRepository(db)
    periods = await repo.get_timeline(
        user_id=user.id,
        group_by=group_by,
        start_date=datetime.fromisoformat(start_date) if start_date else None,
        end_date=datetime.fromisoformat(end_date) if end_date else None,
    )

    formatted = []
    for p in periods:
        formatted.append({
            "period": p["period"],
            "total": p["total"],
            "count": p["count"],
            "transactions": [transaction_to_out(t) for t in p["transactions"]],
        })
    return TimelineResponse(periods=formatted)


@router.get("/replay", response_model=ReplayResponse)
async def get_replay(
    date: str = Query(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = TransactionRepository(db)
    txn_date = datetime.strptime(date, "%Y-%m-%d") if "-" in date else datetime.fromisoformat(date)
    txns, breakdown = await repo.get_replay(user_id=user.id, date=txn_date)
    total = sum(t.amount for t in txns)

    return ReplayResponse(
        date=date,
        transactions=[transaction_to_out(t) for t in txns],
        total=total,
        ai_summary=f"Total spending on {date}: ₹{total:.2f}. Most spending was on {max(breakdown, key=breakdown.get) if breakdown else 'nothing'}.",
        category_breakdown=breakdown,
    )


@router.get("/{id}", response_model=TransactionOut)
async def get_transaction(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = TransactionRepository(db)
    t = await repo.get_with_relations(uuid.UUID(id))
    if not t or t.user_id != user.id:
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")
    return transaction_to_out(t)


@router.patch("/{id}/category", response_model=TransactionOut)
async def recategorize_transaction(
    id: str,
    body: RecategorizeRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    from app.repositories.category_repo import CategoryRepository
    repo = TransactionRepository(db)
    t = await repo.get_with_relations(uuid.UUID(id))
    if not t or t.user_id != user.id:
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Transaction not found")

    cat_repo = CategoryRepository(db)
    cat = await cat_repo.get(uuid.UUID(body.category_id))
    if not cat:
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    t.category_id = cat.id
    await db.flush()
    await db.refresh(t)
    return transaction_to_out(t)
