from datetime import datetime

from pydantic import BaseModel


class MerchantOut(BaseModel):
    id: str
    name: str
    category_id: str | None = None
    category_name: str | None = None
    logo_url: str | None = None
    lat: float | None = None
    lng: float | None = None
    city: str | None = None
    locality: str | None = None
    state: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class MerchantAnalytics(BaseModel):
    total_spent: float
    avg_order_value: float
    visit_count: int
    first_transaction: datetime | None = None
    latest_transaction: datetime | None = None
    monthly_trend: list[dict] = []
    most_common_day: str | None = None
    avg_monthly_expense: float = 0
    payment_frequency: str | None = None
    location: dict | None = None


class PaginatedMerchants(BaseModel):
    items: list[MerchantOut]
    total: int
    page: int
    size: int
    pages: int
