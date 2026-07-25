from pydantic import BaseModel


class DummyPaymentRequest(BaseModel):
    merchant: str
    amount: float
    category: str | None = None
    provider: str = "PhonePe"
    city: str | None = None
    locality: str | None = None
    lat: float | None = None
    lng: float | None = None


class DummySubscriptionRequest(BaseModel):
    merchant: str
    amount: float
    frequency: str = "monthly"
    category: str | None = None
    provider: str = "PhonePe"
    next_date: str | None = None


class DummyBulkRequest(BaseModel):
    count: int = 50
    months_back: int = 6


class DummyBulkResponse(BaseModel):
    created: int
    message: str


class DummyProvidersResponse(BaseModel):
    providers: list[str]
