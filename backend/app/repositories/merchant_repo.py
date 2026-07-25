import uuid

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.models.merchant import Merchant
from app.models.transaction import Transaction
from app.repositories.base import BaseRepository


class MerchantRepository(BaseRepository[Merchant]):
    def __init__(self, db: AsyncSession):
        super().__init__(Merchant, db)

    async def list_user_merchants(
        self, user_id: uuid.UUID, page: int = 1, size: int = 20, search: str | None = None
    ) -> tuple[list[Merchant], int]:
        query = select(Merchant).distinct().join(Transaction, Transaction.merchant_id == Merchant.id).where(
            Transaction.user_id == user_id
        )

        if search:
            query = query.where(func.lower(Merchant.name).like(f"%{search.lower()}%"))

        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        offset = (page - 1) * size
        query = query.offset(offset).limit(size).order_by(Merchant.name)
        result = await self.db.execute(query)
        items = list(result.unique().scalars().all())
        return items, total

    async def get_analytics(self, merchant_id: uuid.UUID, user_id: uuid.UUID) -> dict:
        result = await self.db.execute(
            select(
                func.sum(Transaction.amount).label("total_spent"),
                func.avg(Transaction.amount).label("avg_order"),
                func.count(Transaction.id).label("visit_count"),
                func.min(Transaction.transaction_date).label("first_txn"),
                func.max(Transaction.transaction_date).label("latest_txn"),
            ).where(
                Transaction.merchant_id == merchant_id,
                Transaction.user_id == user_id,
            )
        )
        stats = result.one()

        trend_result = await self.db.execute(
            select(
                func.to_char(Transaction.transaction_date, 'YYYY-MM').label("month"),
                func.sum(Transaction.amount).label("total"),
            )
            .where(Transaction.merchant_id == merchant_id, Transaction.user_id == user_id)
            .group_by(text("month"))
            .order_by(text("month desc"))
            .limit(12)
        )
        monthly_trend = [
            {"month": row[0] or "", "total": float(row[1] or 0)}
            for row in trend_result.all()
        ]

        merchant = await self.get(merchant_id)
        location = None
        if merchant and merchant.lat and merchant.lng:
            location = {
                "lat": merchant.lat,
                "lng": merchant.lng,
                "city": merchant.city,
                "locality": merchant.locality,
            }

        return {
            "total_spent": float(stats.total_spent or 0),
            "avg_order_value": round(float(stats.avg_order or 0), 2),
            "visit_count": stats.visit_count or 0,
            "first_transaction": stats.first_txn,
            "latest_transaction": stats.latest_txn,
            "monthly_trend": monthly_trend,
            "most_common_day": None,
            "avg_monthly_expense": round(float(stats.total_spent or 0) / max(len(monthly_trend), 1), 2),
            "payment_frequency": None,
            "location": location,
        }
