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

    async def get_dashboard(self, user_id: uuid.UUID, days: int | None = None) -> dict:
        now = datetime.now(timezone.utc)
        # Start of selected period (default current month)
        if days and days > 0:
            start_of_month = now - timedelta(days=days)
        else:
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

        # Today's spending (transactions in the last 24 hours)
        twenty_four_hours_ago = now - timedelta(hours=24)
        today_result = await self.db.execute(
            select(func.coalesce(func.sum(Transaction.amount), 0)).where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= twenty_four_hours_ago,
            )
        )
        today_spending = float(today_result.scalar() or 0)
        if today_spending == 0 and monthly_spending > 0:
            # Show daily average spend if no txn in last 24 hours
            days_in_month = max(1, now.day)
            today_spending = round(monthly_spending / days_in_month, 2)

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

        # Subscription count and cost
        sub_result = await self.db.execute(
            select(func.count(), func.coalesce(func.sum(Subscription.amount), 0)).where(
                Subscription.user_id == user_id, Subscription.status == "active"
            )
        )
        sub_row = sub_result.first()
        subscription_count = sub_row[0] if sub_row else 0
        total_sub_cost = float(sub_row[1] if sub_row else 0)

        # Calculate potential savings dynamically
        potential_savings = round((monthly_spending * 0.15) + (total_sub_cost * 0.2), 2)
        if potential_savings == 0 and monthly_spending > 0:
            potential_savings = round(monthly_spending * 0.12, 2)

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
            "potential_savings": potential_savings,
            "spending_change_pct": spending_change,
        }

    async def get_category_breakdown(self, user_id: uuid.UUID, days: int | None = None) -> list[dict]:
        now = datetime.now(timezone.utc)
        if days and days > 0:
            start_time = now - timedelta(days=days)
        else:
            start_time = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        # Fetch all database categories
        cat_result = await self.db.execute(select(Category))
        categories = cat_result.scalars().all()

        # Standard categories guaranteed to appear as requested
        standard_cats = [
            {"name": "Food & Dining", "color": "#f87171"},
            {"name": "Lifestyle", "color": "#a855f7"},
            {"name": "Medicine & Health", "color": "#10b981"},
            {"name": "Shopping", "color": "#38bdf8"},
            {"name": "Bills & Utilities", "color": "#fbbf24"},
            {"name": "Entertainment", "color": "#ec4899"},
            {"name": "Transportation", "color": "#6366f1"},
            {"name": "Education", "color": "#14b8a6"},
        ]

        # Fetch user transactions in this period
        txns_result = await self.db.execute(
            select(Transaction).where(
                Transaction.user_id == user_id,
                Transaction.transaction_date >= start_time,
            )
        )
        txns = txns_result.scalars().all()

        # Aggregate amounts and counts by category id
        totals = {}
        counts = {}
        for t in txns:
            cid = str(t.category_id) if t.category_id else "general"
            totals[cid] = totals.get(cid, 0.0) + float(t.amount)
            counts[cid] = counts.get(cid, 0) + 1

        grand_total = sum(totals.values()) or 1.0
        items = []
        seen_names = set()

        for c in categories:
            cid = str(c.id)
            tot = totals.get(cid, 0.0)
            seen_names.add(c.name.lower())
            items.append({
                "category_id": cid,
                "category_name": c.name,
                "total": tot,
                "percentage": round(tot / grand_total * 100, 1),
                "transaction_count": counts.get(cid, 0),
                "color": c.color or "#38bdf8",
            })

        for sc in standard_cats:
            if not any(sc["name"].lower() in name for name in seen_names):
                items.append({
                    "category_id": str(uuid.uuid4()),
                    "category_name": sc["name"],
                    "total": 0.0,
                    "percentage": 0.0,
                    "transaction_count": 0,
                    "color": sc["color"],
                })

        # Sort by total descending, but keep alphabetical order as tiebreaker
        items.sort(key=lambda x: (-x["total"], x["category_name"]))
        return items

    async def get_trends(self, user_id: uuid.UUID, period: str = "6m", category_id: uuid.UUID | None = None) -> list[dict]:
        months_map = {"1m": 1, "3m": 3, "6m": 6, "1y": 12}
        months = months_map.get(period, 6)

        cutoff = datetime.now(timezone.utc) - timedelta(days=months * 30)

        dialect = self.db.bind.dialect.name if self.db.bind else "sqlite"
        if dialect == "postgresql":
            month_expr = func.to_char(Transaction.transaction_date, 'YYYY-MM')
        else:
            month_expr = func.strftime("%Y-%m", Transaction.transaction_date)

        query = select(
            month_expr.label("month"),
            func.coalesce(func.sum(Transaction.amount), 0).label("total"),
        ).where(
            Transaction.user_id == user_id,
            Transaction.transaction_date >= cutoff,
        )
        if category_id:
            query = query.where(Transaction.category_id == category_id)
        query = query.group_by(text("month")).order_by(text("month asc"))

        result = await self.db.execute(query)
        db_rows = result.all()
        db_data = {r[0]: float(r[1]) for r in db_rows}

        # Generate all months in the period
        now = datetime.now(timezone.utc)
        trends = []
        for i in range(months - 1, -1, -1):
            target_month_num = now.month - i
            target_year_num = now.year
            
            while target_month_num <= 0:
                target_month_num += 12
                target_year_num -= 1
                
            month_str = f"{target_year_num}-{target_month_num:02d}"
            total = db_data.get(month_str, 0.0)
            trends.append({"period": month_str, "total": total, "categories": {}})
            
        return trends
