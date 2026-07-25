import uuid
from datetime import datetime, timezone, timedelta

from sqlalchemy import func, select, text, case
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category import Category
from app.models.merchant import Merchant
from app.models.subscription import Subscription
from app.models.transaction import Transaction


class AnalyticsRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard(self, user_id: uuid.UUID) -> dict:
        now = datetime.now(timezone.utc)
        # Start of current month
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        # Start of today
        start_of_today = now.replace(hour=0, minute=0, second=0, microsecond=0)
        # Start of last month
        if now.month == 1:
            start_of_last_month = now.replace(year=now.year - 1, month=12, day=1, hour=0, minute=0, second=0, microsecond=0)
        else:
            start_of_last_month = now.replace(month=now.month - 1, day=1, hour=0, minute=0, second=0, microsecond=0)

        # Monthly spending (current month)
        result = await self.db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0)).where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= start_of_month,
            )
        )
        monthly_spending = float(result.scalar() or 0)

        # Today's spending
        today_result = await self.db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0)).where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= start_of_today,
            )
        )
        today_spending = float(today_result.scalar() or 0)

        # Last month spending (for change percentage)
        last_month_result = await self.db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0)).where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= start_of_last_month,
                Transaction.transaction_date < start_of_month,
            )
        )
        last_month_spending = float(last_month_result.scalar() or 0)

        # Category count
        cat_count = await self.db.execute(
            select(func.count(func.distinct(Transaction.category_id)))
            .where(Transaction.user_id == user_id)
        )
        category_count = cat_count.scalar() or 0

        # Top merchant
        top_merchant_result = await self.db.execute(
            select(Merchant.name, func.sum(Transaction.amount).label("total"))
            .join(Transaction, Transaction.merchant_id == Merchant.id)
            .where(Transaction.user_id == user_id)
            .group_by(Merchant.name)
            .order_by(text("total desc"))
            .limit(1)
        )
        top_merchant_row = top_merchant_result.first()
        top_merchant = {"name": top_merchant_row[0], "total": float(top_merchant_row[1])} if top_merchant_row else None

        # Top category
        top_cat_result = await self.db.execute(
            select(Category.name, func.sum(Transaction.amount).label("total"))
            .join(Transaction, Transaction.category_id == Category.id)
            .where(Transaction.user_id == user_id)
            .group_by(Category.name)
            .order_by(text("total desc"))
            .limit(1)
        )
        top_cat_row = top_cat_result.first()
        top_category = top_cat_row[0] if top_cat_row else None

        # Subscription count
        sub_count = await self.db.execute(
            select(func.count()).where(Subscription.user_id == user_id, Subscription.status == "active")
        )
        subscription_count = sub_count.scalar() or 0

        spending_change = round(
            ((monthly_spending - last_month_spending) / last_month_spending * 100), 1
        ) if last_month_spending > 0 else 0

        return {
            "monthly_spending": monthly_spending,
            "today_spending": today_spending,
            "category_count": category_count,
            "top_merchant": top_merchant,
            "top_category": top_category,
            "subscription_count": subscription_count,
            "potential_savings": 0,
            "spending_change_pct": spending_change,
        }

    async def get_category_breakdown(self, user_id: uuid.UUID) -> list[dict]:
        now = datetime.now(timezone.utc)
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        result = await self.db.execute(
            select(
                Category.id,
                Category.name,
                Category.color,
                func.coalesce(func.sum(Transaction.amount), 0).label("total"),
                func.count(Transaction.id).label("txn_count"),
            )
            .join(Transaction, Transaction.category_id == Category.id, isouter=True)
            .where(Transaction.user_id == user_id, Transaction.transaction_date >= start_of_month)
            .group_by(Category.id, Category.name, Category.color)
            .order_by(text("total desc"))
        )
        rows = result.all()
        grand_total = sum(float(r[3] or 0) for r in rows) or 1
        return [
            {
                "category_id": str(r[0]),
                "category_name": r[1],
                "total": float(r[3] or 0),
                "percentage": round(float(r[3] or 0) / grand_total * 100, 1),
                "transaction_count": r[4],
                "color": r[2],
            }
            for r in rows
        ]

    async def get_trends(self, user_id: uuid.UUID, period: str = "6m", category_id: uuid.UUID | None = None) -> list[dict]:
        months_map = {"1m": 1, "3m": 3, "6m": 6, "1y": 12}
        months = months_map.get(period, 6)

        cutoff = datetime.now(timezone.utc) - timedelta(days=months * 30)

        query = select(
            func.to_char(Transaction.transaction_date, 'YYYY-MM').label("month"),
            func.coalesce(func.sum(Transaction.amount), 0).label("total"),
        ).where(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= cutoff,
        )
        if category_id:
            query = query.where(Transaction.category_id == category_id)
        query = query.group_by(text("month")).order_by(text("month asc"))

        result = await self.db.execute(query)
        return [{"period": r[0], "total": float(r[1]), "categories": {}} for r in result.all()]
