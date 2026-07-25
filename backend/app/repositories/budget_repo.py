import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.budget import Budget
from app.models.transaction import Transaction
from app.repositories.base import BaseRepository


class BudgetRepository(BaseRepository[Budget]):
    def __init__(self, db: AsyncSession):
        super().__init__(Budget, db)

    async def get_current_month_spent(self, user_id: uuid.UUID, category_id: uuid.UUID, month: str) -> float:
        year, month_num = month.split("-")
        result = await self.db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0)).where(
                Transaction.user_id == user_id,
                Transaction.category_id == category_id,
                func.to_char(Transaction.transaction_date, "YYYY-MM") == month,
            )
        )
        return float(result.scalar() or 0)

    async def get_progress(self, budget_id: uuid.UUID, user_id: uuid.UUID) -> dict | None:
        budget = await self.get(budget_id)
        if not budget or budget.user_id != user_id:
            return None

        spent = await self.get_current_month_spent(user_id, budget.category_id, budget.month)
        percentage = round((spent / budget.monthly_limit * 100), 1) if budget.monthly_limit > 0 else 0

        return {
            "spent": spent,
            "remaining": round(budget.monthly_limit - spent, 2),
            "percentage": percentage,
            "projected": round(spent, 2),
        }
