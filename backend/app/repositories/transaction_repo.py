import uuid
from datetime import datetime, timezone, timedelta

from sqlalchemy import func, select, text, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.models.merchant import Merchant
from app.models.category import Category
from app.models.transaction import Transaction
from app.repositories.base import BaseRepository


class TransactionRepository(BaseRepository[Transaction]):
    def __init__(self, db: AsyncSession):
        super().__init__(Transaction, db)

    async def list_filtered(
        self,
        user_id: uuid.UUID,
        page: int = 1,
        size: int = 20,
        sort_by: str = "transaction_date",
        sort_order: str = "desc",
        search: str | None = None,
        merchant_id: uuid.UUID | None = None,
        category_id: uuid.UUID | None = None,
        provider: str | None = None,
        city: str | None = None,
        status: str | None = None,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
        min_amount: float | None = None,
        max_amount: float | None = None,
    ) -> tuple[list[Transaction], int]:
        query = select(Transaction).options(
            joinedload(Transaction.merchant),
            joinedload(Transaction.category),
        ).where(Transaction.user_id == user_id)

        if search or city:
            query = query.outerjoin(Merchant, Transaction.merchant_id == Merchant.id)
        if search:
            query = query.outerjoin(Category, Transaction.category_id == Category.id)
            search_term = f"%{search.lower()}%"
            query = query.where(
                or_(
                    func.lower(Transaction.description).like(search_term),
                    func.lower(Transaction.provider).like(search_term),
                    func.lower(Transaction.reference_number).like(search_term),
                    func.lower(Transaction.payment_method).like(search_term),
                    func.lower(Merchant.name).like(search_term),
                    func.lower(Merchant.city).like(search_term),
                    func.lower(Category.name).like(search_term),
                )
            )
        if merchant_id:
            query = query.where(Transaction.merchant_id == merchant_id)
        if category_id:
            query = query.where(Transaction.category_id == category_id)
        if provider:
            query = query.where(Transaction.provider == provider)
        if city:
            query = query.where(
                func.lower(Merchant.city) == city.lower()
            )
        if status:
            query = query.where(Transaction.status == status)
        if start_date:
            query = query.where(Transaction.transaction_date >= start_date)
        if end_date:
            query = query.where(Transaction.transaction_date <= end_date)
        if min_amount is not None:
            query = query.where(Transaction.amount >= min_amount)
        if max_amount is not None:
            query = query.where(Transaction.amount <= max_amount)

        sort_column = getattr(Transaction, sort_by, Transaction.transaction_date)
        query = query.order_by(sort_column.desc() if sort_order == "desc" else sort_column.asc())

        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        offset = (page - 1) * size
        query = query.offset(offset).limit(size)
        result = await self.db.execute(query)
        items = list(result.unique().scalars().all())
        return items, total

    async def get_with_relations(self, id: uuid.UUID) -> Transaction | None:
        result = await self.db.execute(
            select(Transaction)
            .options(joinedload(Transaction.merchant), joinedload(Transaction.category))
            .where(Transaction.id == id)
        )
        return result.scalar_one_or_none()

    async def get_timeline(
        self, user_id: uuid.UUID, group_by: str, start_date: datetime | None, end_date: datetime | None
    ) -> list[dict]:
        fmt_map = {
            "daily": "YYYY-MM-DD",
            "weekly": "YYYY-IW",
            "monthly": "YYYY-MM",
            "yearly": "YYYY",
        }
        fmt = fmt_map.get(group_by, "YYYY-MM-DD")

        query = select(
            func.to_char(Transaction.transaction_date, fmt).label("period"),
            func.sum(Transaction.amount).label("total"),
            func.count(Transaction.id).label("count"),
        ).where(Transaction.user_id == user_id)

        if start_date:
            query = query.where(Transaction.transaction_date >= start_date)
        if end_date:
            query = query.where(Transaction.transaction_date <= end_date)

        query = query.group_by(text("period")).order_by(text("period desc"))
        result = await self.db.execute(query)
        rows = result.all()

        periods = []
        for row in rows:
            period_str = row[0]
            txn_result = await self.db.execute(
                select(Transaction)
                .options(joinedload(Transaction.merchant), joinedload(Transaction.category))
                .where(
                    Transaction.user_id == user_id,
                    func.to_char(Transaction.transaction_date, fmt) == period_str,
                )
                .order_by(Transaction.transaction_date.desc())
            )
            txns = list(txn_result.unique().scalars().all())
            periods.append({
                "period": period_str,
                "total": float(row[1] or 0),
                "count": row[2],
                "transactions": txns,
            })
        return periods

    async def get_replay(self, user_id: uuid.UUID, date: datetime) -> tuple[list[Transaction], dict]:
        start_of_day = date.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = date.replace(hour=23, minute=59, second=59, microsecond=999999)

        result = await self.db.execute(
            select(Transaction)
            .options(joinedload(Transaction.merchant), joinedload(Transaction.category))
            .where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= start_of_day,
                Transaction.transaction_date <= end_of_day,
            )
            .order_by(Transaction.transaction_date.asc())
        )
        txns = list(result.unique().scalars().all())

        breakdown = {}
        for t in txns:
            cat_name = t.category.name if t.category else "Other"
            breakdown[cat_name] = breakdown.get(cat_name, 0) + t.amount

        return txns, breakdown
