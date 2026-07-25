from datetime import datetime

from pydantic import BaseModel


class BudgetCreate(BaseModel):
    category_id: str
    monthly_limit: float
    month: str | None = None


class BudgetUpdate(BaseModel):
    monthly_limit: float | None = None
    category_id: str | None = None


class BudgetOut(BaseModel):
    id: str
    category_id: str
    monthly_limit: float
    month: str
    spent: float
    created_at: datetime
    updated_at: datetime
    category_name: str | None = None

    model_config = {"from_attributes": True}


class BudgetProgress(BaseModel):
    budget: BudgetOut
    spent: float
    remaining: float
    percentage: float
    projected: float


class PaginatedBudgets(BaseModel):
    items: list[BudgetOut]
    total: int
    page: int
    size: int
    pages: int
