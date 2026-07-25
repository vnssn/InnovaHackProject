import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.subscription_repo import SubscriptionRepository
from app.schemas.common import MessageResponse
from app.schemas.subscription import (
    DetectResponse,
    PaginatedSubscriptions,
    SubscriptionLeakReport,
    SubscriptionOut,
    SubscriptionUpdate,
)
from app.utils.pagination import paginate

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


def sub_to_out(s):
    return SubscriptionOut(
        id=str(s.id),
        merchant_id=str(s.merchant_id) if s.merchant_id else None,
        category_id=str(s.category_id) if s.category_id else None,
        amount=s.amount,
        frequency=s.frequency,
        next_date=s.next_date,
        status=s.status,
        notes=s.notes,
        created_at=s.created_at,
        merchant_name=s.merchant.name if s.merchant else None,
        category_name=s.category.name if s.category else None,
    )


@router.get("", response_model=PaginatedSubscriptions)
async def list_subscriptions(
    status_filter: str | None = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = SubscriptionRepository(db)
    filters = {"user_id": user.id}
    if status_filter:
        filters["status"] = status_filter
    items, total = await repo.list(page=page, size=size, **filters)
    return paginate([sub_to_out(s) for s in items], total, page, size)


@router.patch("/{id}", response_model=SubscriptionOut)
async def update_subscription(
    id: str,
    body: SubscriptionUpdate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = SubscriptionRepository(db)
    sub = await repo.get(uuid.UUID(id))
    if not sub or sub.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")

    updated = await repo.update(
        uuid.UUID(id),
        status=body.status,
        notes=body.notes,
    )
    return sub_to_out(updated)


@router.delete("/{id}", response_model=MessageResponse)
async def delete_subscription(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = SubscriptionRepository(db)
    sub = await repo.get(uuid.UUID(id))
    if not sub or sub.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")
    await repo.delete(uuid.UUID(id))
    return MessageResponse(message="Subscription deleted")


@router.post("/detect", response_model=DetectResponse)
async def detect_subscriptions(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return DetectResponse(subscriptions=[], detected_count=0)


@router.get("/leaks", response_model=SubscriptionLeakReport)
async def get_subscription_leaks(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return SubscriptionLeakReport(
        leak_score=0.0,
        potential_savings=0.0,
        unused=[],
        duplicates=[],
        price_increases=[],
        recommendations=["Connect OpenAI API to get subscription leak analysis."],
    )
