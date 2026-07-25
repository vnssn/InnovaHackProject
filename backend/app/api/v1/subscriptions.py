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
    SubscriptionCreate,
)
from app.utils.pagination import paginate

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])

@router.post("", response_model=SubscriptionOut, status_code=201)
async def create_subscription(
    body: SubscriptionCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = SubscriptionRepository(db)
    cat_id = uuid.UUID(body.category_id) if body.category_id else None
    s = await repo.create(
        user_id=user.id,
        amount=body.amount,
        frequency=body.frequency,
        next_date=body.next_date,
        status=body.status,
        category_id=cat_id,
        notes=body.custom_name,  # store custom_name in notes field
    )
    return sub_to_out(s)


def sub_to_out(s):
    # When no linked merchant, fall back to notes (custom_name) for display
    merchant_name = s.merchant.name if s.merchant else s.notes
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
        merchant_name=merchant_name,
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

    # Merge custom_name into notes if provided
    notes = body.notes if body.notes is not None else body.custom_name
    updated = await repo.update(
        uuid.UUID(id),
        status=body.status,
        notes=notes,
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
    from app.repositories.transaction_repo import TransactionRepository
    from collections import defaultdict
    from datetime import timedelta

    txn_repo = TransactionRepository(db)
    sub_repo = SubscriptionRepository(db)
    
    recent_txns, _ = await txn_repo.list_filtered(user.id, page=1, size=500)
    
    merchant_amounts = defaultdict(list)
    for txn in recent_txns:
        if txn.merchant_id:
            merchant_amounts[(txn.merchant_id, txn.amount)].append(txn)
            
    detected = 0
    for (m_id, amt), txns in merchant_amounts.items():
        if len(txns) >= 2:
            txns = sorted(txns, key=lambda t: t.transaction_date)
            diffs = [(txns[i].transaction_date - txns[i-1].transaction_date).days for i in range(1, len(txns))]
            if all(25 <= d <= 35 for d in diffs):
                existing, _ = await sub_repo.list(page=1, size=1, user_id=user.id, merchant_id=m_id)
                if not existing:
                    next_date = txns[-1].transaction_date + timedelta(days=30)
                    # convert next_date to timezone-aware if needed, but assuming model handles it
                    await sub_repo.create(
                        user_id=user.id,
                        merchant_id=m_id,
                        category_id=txns[-1].category_id,
                        amount=amt,
                        frequency="monthly",
                        next_date=next_date,
                        status="active"
                    )
                    detected += 1
                    
    items, _ = await sub_repo.list(page=1, size=100, user_id=user.id)
    out_items = [sub_to_out(s) for s in items]
    return DetectResponse(subscriptions=out_items, detected_count=detected)


@router.get("/leaks", response_model=SubscriptionLeakReport)
async def get_subscription_leaks(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    sub_repo = SubscriptionRepository(db)
    items, _ = await sub_repo.list(page=1, size=100, user_id=user.id, status="active")
    
    duplicates: list = []
    unused: list = []
    potential_savings = 0.0
    recommendations = []
    
    seen_merchants = set()
    for sub in items:
        if sub.merchant_id in seen_merchants:
            merchant_name = sub.merchant.name if sub.merchant else (sub.notes or "Unknown")
            duplicates.append(sub_to_out(sub))
            potential_savings += sub.amount
            recommendations.append(f"Cancel duplicate subscription for {merchant_name}.")
        elif sub.merchant_id:
            seen_merchants.add(sub.merchant_id)
            
    leak_score = 0.0
    if items:
        leak_score = min(1.0, (len(duplicates) + len(unused)) / max(1, len(items)))
        
    if not recommendations:
        recommendations.append("Your subscription health looks good. No major issues detected.")
            
    return SubscriptionLeakReport(
        leak_score=leak_score,
        potential_savings=potential_savings,
        unused=unused,
        duplicates=duplicates,
        price_increases=[],
        recommendations=recommendations,
    )
