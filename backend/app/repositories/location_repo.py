import uuid

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.merchant import Merchant
from app.models.transaction import Transaction


class LocationRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_heatmap(self, user_id: uuid.UUID, month: str | None = None, year: str | None = None) -> list[dict]:
        query = select(
            Merchant.lat,
            Merchant.lng,
            func.sum(Transaction.amount).label("weight"),
            Merchant.locality,
        ).join(Transaction, Transaction.merchant_id == Merchant.id).where(
            Transaction.user_id == user_id,
            Merchant.lat.isnot(None),
            Merchant.lng.isnot(None),
        )
        if year and month:
            query = query.where(func.to_char(Transaction.transaction_date, "YYYY-MM") == f"{year}-{month}")
        elif year:
            query = query.where(func.to_char(Transaction.transaction_date, "YYYY") == year)

        query = query.group_by(Merchant.lat, Merchant.lng, Merchant.locality)
        result = await self.db.execute(query)
        rows = result.all()
        weights = [float(r[2] or 0) for r in rows]
        max_weight = max(weights) if weights else 1

        return [
            {"lat": float(r[0]), "lng": float(r[1]), "weight": round(float(r[2] or 0) / max_weight, 4), "category": r[3]}
            for r in rows
        ]

    async def get_top_cities(self, user_id: uuid.UUID) -> list[dict]:
        result = await self.db.execute(
            select(
                Merchant.city,
                func.sum(Transaction.amount).label("total"),
                func.count(Transaction.id).label("count"),
            )
            .join(Transaction, Transaction.merchant_id == Merchant.id)
            .where(Transaction.user_id == user_id, Merchant.city.isnot(None))
            .group_by(Merchant.city)
            .order_by(text("total desc"))
        )
        rows = result.all()
        grand_total = sum(float(r[1] or 0) for r in rows) or 1
        return [
            {"city": r[0], "total": float(r[1] or 0), "count": r[2], "percentage": round(float(r[1] or 0) / grand_total * 100, 1)}
            for r in rows
        ]

    async def get_top_localities(self, user_id: uuid.UUID, city: str | None = None) -> list[dict]:
        query = select(
            Merchant.locality, Merchant.city,
            func.sum(Transaction.amount).label("total"),
            func.count(Transaction.id).label("count"),
        ).join(Transaction, Transaction.merchant_id == Merchant.id).where(
            Transaction.user_id == user_id, Merchant.locality.isnot(None)
        )
        if city:
            query = query.where(Merchant.city == city)
        query = query.group_by(Merchant.locality, Merchant.city).order_by(text("total desc"))

        result = await self.db.execute(query)
        return [
            {"locality": r[0], "city": r[1], "total": float(r[2] or 0), "count": r[3]}
            for r in result.all()
        ]
