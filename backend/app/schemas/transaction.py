from datetime import datetime

from pydantic import BaseModel


class RecategorizeRequest(BaseModel):
    category_id: str


class TransactionCreate(BaseModel):
    amount: float
    description: str | None = None
    transaction_date: datetime
    provider: str = "manual"
    status: str = "completed"
    category_id: str | None = None
    city: str | None = None
    locality: str | None = None


class TransactionOut(BaseModel):
    id: str
    merchant_id: str | None = None
    category_id: str | None = None
    provider: str
    amount: float
    description: str | None = None
    status: str
    payment_method: str | None = None
    reference_number: str | None = None
    remarks: str | None = None
    transaction_date: datetime
    created_at: datetime
    merchant_name: str | None = None
    category_name: str | None = None
    city: str | None = None
    locality: str | None = None

    model_config = {"from_attributes": True}


class PaginatedTransactions(BaseModel):
    items: list[TransactionOut]
    total: int
    page: int
    size: int
    pages: int


class TimelineEntry(BaseModel):
    period: str
    total: float
    count: int
    transactions: list[TransactionOut]


class TimelineResponse(BaseModel):
    periods: list[TimelineEntry]


class ReplayResponse(BaseModel):
    date: str
    transactions: list[TransactionOut]
    total: float
    ai_summary: str | None = None
    category_breakdown: dict
