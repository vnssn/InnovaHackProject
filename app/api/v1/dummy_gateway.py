from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.dummy_gateway import (
    DummyBulkRequest,
    DummyBulkResponse,
    DummyPaymentRequest,
    DummyProvidersResponse,
    DummySubscriptionRequest,
)
from app.schemas.subscription import SubscriptionOut
from app.schemas.transaction import TransactionOut
from app.services.dummy_gateway_service import PROVIDERS, DummyGatewayService

router = APIRouter(prefix="/dummy", tags=["Dummy Gateway"])


@router.post("/payments", response_model=TransactionOut)
async def create_dummy_payment(
    body: DummyPaymentRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = DummyGatewayService(db)
    t = await service.create_payment(
        user_id=user.id,
        merchant_name=body.merchant,
        amount=body.amount,
        category_name=body.category,
        provider=body.provider,
        city=body.city,
        locality=body.locality,
        lat=body.lat,
        lng=body.lng,
    )
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


@router.post("/subscriptions", response_model=SubscriptionOut)
async def create_dummy_subscription(
    body: DummySubscriptionRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    from datetime import datetime, timezone
    from app.repositories.category_repo import CategoryRepository
    from app.repositories.merchant_repo import MerchantRepository
    from app.repositories.subscription_repo import SubscriptionRepository

    cat_repo = CategoryRepository(db)
    category = None
    if body.category:
        category = await cat_repo.get_by_name(body.category)
        if not category:
            category = await cat_repo.create(name=body.category, is_system=False)

    merchant_repo = MerchantRepository(db)
    merchants, _ = await merchant_repo.list(page=1, size=1, name=body.merchant)
    if not merchants:
        merchant = await merchant_repo.create(
            name=body.merchant,
            category_id=category.id if category else None,
        )
    else:
        merchant = merchants[0]

    sub_repo = SubscriptionRepository(db)
    next_date = None
    if body.next_date:
        next_date = datetime.fromisoformat(body.next_date)

    sub = await sub_repo.create(
        user_id=user.id,
        merchant_id=merchant.id,
        category_id=category.id if category else None,
        amount=body.amount,
        frequency=body.frequency,
        next_date=next_date or datetime.now(timezone.utc),
        status="active",
    )
    return SubscriptionOut(
        id=str(sub.id),
        merchant_id=str(sub.merchant_id) if sub.merchant_id else None,
        category_id=str(sub.category_id) if sub.category_id else None,
        amount=sub.amount,
        frequency=sub.frequency,
        next_date=sub.next_date,
        status=sub.status,
        notes=sub.notes,
        created_at=sub.created_at,
        merchant_name=merchant.name,
        category_name=category.name if category else None,
    )


@router.post("/bulk", response_model=DummyBulkResponse)
async def bulk_generate(
    body: DummyBulkRequest = DummyBulkRequest(),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    service = DummyGatewayService(db)
    created = await service.bulk_generate(user.id, body.count, body.months_back)
    return DummyBulkResponse(created=created, message=f"Created {created} dummy transactions")


@router.get("/providers", response_model=DummyProvidersResponse)
async def get_providers():
    return DummyProvidersResponse(providers=PROVIDERS)
