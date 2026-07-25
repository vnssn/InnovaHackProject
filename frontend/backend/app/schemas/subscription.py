from datetime import datetime

from pydantic import BaseModel

class SubscriptionCreate(BaseModel):
    amount: float
    frequency: str = "monthly"
    next_date: datetime | None = None
    custom_name: str | None = None
    category_id: str | None = None
    status: str = "active"


class SubscriptionOut(BaseModel):
    id: str
    merchant_id: str | None = None
    category_id: str | None = None
    amount: float
    frequency: str
    next_date: datetime | None = None
    status: str
    notes: str | None = None
    created_at: datetime
    merchant_name: str | None = None
    category_name: str | None = None

    model_config = {"from_attributes": True}


class SubscriptionUpdate(BaseModel):
    status: str | None = None
    notes: str | None = None
    custom_name: str | None = None


class PaginatedSubscriptions(BaseModel):
    items: list[SubscriptionOut]
    total: int
    page: int
    size: int
    pages: int


class SubscriptionLeakReport(BaseModel):
    leak_score: float
    potential_savings: float
    unused: list[SubscriptionOut]
    duplicates: list[SubscriptionOut]
    price_increases: list[SubscriptionOut]
    recommendations: list[str]


class DetectResponse(BaseModel):
    subscriptions: list[SubscriptionOut]
    detected_count: int
