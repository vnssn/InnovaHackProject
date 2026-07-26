import uuid

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.analytics_repo import AnalyticsRepository
from app.schemas.analytics import (
    CategoryBreakdown,
    DashboardResponse,
    OverviewResponse,
    TrendsResponse,
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard", response_model=DashboardResponse)
async def get_dashboard(
    days: int | None = Query(default=None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = AnalyticsRepository(db)
    return await repo.get_dashboard(user.id, days=days)


@router.get("/category-breakdown", response_model=CategoryBreakdown)
async def get_category_breakdown(
    days: int | None = Query(default=None),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = AnalyticsRepository(db)
    items = await repo.get_category_breakdown(user.id, days=days)
    return CategoryBreakdown(items=items)


@router.get("/trends", response_model=TrendsResponse)
async def get_trends(
    period: str = Query("6m", pattern="^(1m|3m|6m|1y)$"),
    category_id: str | None = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = AnalyticsRepository(db)
    items = await repo.get_trends(
        user.id,
        period=period,
        category_id=uuid.UUID(category_id) if category_id else None,
    )
    return TrendsResponse(items=items)


@router.get("/overview", response_model=OverviewResponse)
async def get_overview(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = AnalyticsRepository(db)
    dashboard = await repo.get_dashboard(user.id)
    cat_breakdown = await repo.get_category_breakdown(user.id)
    trends = await repo.get_trends(user.id)

    from app.repositories.merchant_repo import MerchantRepository
    merchant_repo = MerchantRepository(db)
    merchants, _ = await merchant_repo.list_user_merchants(user.id, page=1, size=5)
    top_merchants = []
    for m in merchants:
        analytics = await merchant_repo.get_analytics(m.id, user.id)
        top_merchants.append({"id": str(m.id), "name": m.name, **analytics})

    return OverviewResponse(
        dashboard=dashboard,
        category_breakdown=CategoryBreakdown(items=cat_breakdown),
        trends=trends,
        top_merchants=top_merchants,
    )
