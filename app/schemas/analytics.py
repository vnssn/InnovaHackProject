from pydantic import BaseModel


class DashboardResponse(BaseModel):
    monthly_spending: float
    today_spending: float
    category_count: int
    top_merchant: dict | None = None
    top_category: str | None = None
    subscription_count: int
    potential_savings: float
    spending_change_pct: float


class CategoryBreakdown(BaseModel):
    items: list[dict]


class TrendItem(BaseModel):
    period: str
    total: float
    categories: dict


class TrendsResponse(BaseModel):
    items: list[TrendItem]


class OverviewResponse(BaseModel):
    dashboard: dict
    category_breakdown: list[dict]
    trends: list[dict]
    top_merchants: list[dict]
