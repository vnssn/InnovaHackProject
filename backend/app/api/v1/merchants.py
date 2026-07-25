import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.merchant_repo import MerchantRepository
from app.schemas.merchant import MerchantAnalytics, MerchantOut, PaginatedMerchants
from app.utils.pagination import paginate

router = APIRouter(prefix="/merchants", tags=["Merchants"])


def merchant_to_out(m):
    return MerchantOut(
        id=str(m.id),
        name=m.name,
        category_id=str(m.category_id) if m.category_id else None,
        category_name=m.category.name if m.category else None,
        logo_url=m.logo_url,
        lat=m.lat,
        lng=m.lng,
        city=m.city,
        locality=m.locality,
        state=m.state,
        created_at=m.created_at,
    )


@router.get("", response_model=PaginatedMerchants)
async def list_merchants(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    search: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = MerchantRepository(db)
    items, total = await repo.list_user_merchants(user.id, page, size, search)
    return paginate([merchant_to_out(m) for m in items], total, page, size)


@router.get("/{id}", response_model=MerchantOut)
async def get_merchant(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = MerchantRepository(db)
    m = await repo.get(uuid.UUID(id))
    if not m:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Merchant not found")
    return merchant_to_out(m)


@router.get("/{id}/analytics", response_model=MerchantAnalytics)
async def get_merchant_analytics(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = MerchantRepository(db)
    m = await repo.get(uuid.UUID(id))
    if not m:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Merchant not found")
    return await repo.get_analytics(m.id, user.id)
