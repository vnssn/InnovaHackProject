import random
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.transaction import Transaction
from app.repositories.category_repo import CategoryRepository
from app.repositories.merchant_repo import MerchantRepository
from app.repositories.transaction_repo import TransactionRepository

PROVIDERS = ["PhonePe", "Google Pay", "Paytm", "Bank", "Credit Card", "Debit Card", "Wallet"]

MERCHANTS = [
    ("McDonald's", "Food", "Connaught Place", "New Delhi", 28.6304, 77.2177),
    ("PVR Cinemas", "Entertainment", "Saket", "New Delhi", 28.5289, 77.2203),
    ("Zomato", "Food", "Hauz Khas", "New Delhi", 28.5494, 77.2004),
    ("Swiggy", "Food", "Indiranagar", "Bangalore", 12.9783, 77.6408),
    ("Uber", "Travel", "MG Road", "Bangalore", 12.9716, 77.5946),
    ("Ola", "Travel", "Koramangala", "Bangalore", 12.9352, 77.6245),
    ("Netflix", "Entertainment", None, None, None, None),
    ("Spotify", "Entertainment", None, None, None, None),
    ("Amazon", "Shopping", "Whitefield", "Bangalore", 12.9698, 77.7500),
    ("Flipkart", "Shopping", "HSR Layout", "Bangalore", 12.9116, 77.6389),
    ("BigBasket", "Groceries", "Jayanagar", "Bangalore", 12.9250, 77.5938),
    ("Blinkit", "Groceries", "Dwarka", "New Delhi", 28.5921, 77.0456),
    ("Zepto", "Groceries", "Andheri", "Mumbai", 19.1136, 72.8697),
    ("Indian Oil", "Fuel", "Karol Bagh", "New Delhi", 28.6519, 77.1908),
    ("BPCL", "Fuel", "Bandra", "Mumbai", 19.0596, 72.8295),
    ("Airtel", "Bills", None, None, None, None),
    ("Jio", "Bills", None, None, None, None),
    ("Starbucks", "Cafe", "Connaught Place", "New Delhi", 28.6315, 77.2167),
    ("Dmart", "Groceries", "Malad", "Mumbai", 19.1792, 72.8494),
    ("Myntra", "Shopping", None, None, None, None),
    ("Urban Company", "Lifestyle", None, None, None, None),
    ("Cult.fit", "Lifestyle", "Indiranagar", "Bangalore", 12.9783, 77.6408),
    ("Apollo Pharmacy", "Healthcare", "Lajpat Nagar", "New Delhi", 28.5655, 77.2440),
    ("Practo", "Healthcare", None, None, None, None),
    ("MakeMyTrip", "Travel", None, None, None, None),
]

CATEGORY_MAP = {
    "Food": "Food", "Cafe": "Cafe", "Restaurant": "Restaurant",
    "Travel": "Travel", "Fuel": "Fuel", "Shopping": "Shopping",
    "Lifestyle": "Lifestyle", "Entertainment": "Entertainment",
    "Groceries": "Groceries", "Healthcare": "Healthcare",
    "Education": "Education", "Bills": "Bills",
    "Subscriptions": "Subscriptions", "Others": "Others",
}


class DummyGatewayService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.txn_repo = TransactionRepository(db)
        self.merchant_repo = MerchantRepository(db)
        self.cat_repo = CategoryRepository(db)

    async def create_payment(
        self, user_id: uuid.UUID, merchant_name: str, amount: float,
        category_name: str | None = None, provider: str = "PhonePe",
        city: str | None = None, locality: str | None = None,
        lat: float | None = None, lng: float | None = None,
    ) -> Transaction:
        category = await self._get_or_create_category(category_name or "Others")

        merchant_data = self._find_merchant_data(merchant_name)
        merchant = await self._get_or_create_merchant(
            merchant_name,
            category.id if category else None,
            merchant_data,
        )

        final_city = city or merchant.city or "Unknown"
        final_locality = locality or merchant.locality or "Unknown"
        final_lat = lat or merchant.lat or 0
        final_lng = lng or merchant.lng or 0

        transaction = await self.txn_repo.create(
            user_id=user_id,
            merchant_id=merchant.id,
            category_id=category.id if category else None,
            provider=provider,
            amount=amount,
            description=f"Payment at {merchant_name}",
            status="completed",
            payment_method=provider,
            reference_number=f"REF{random.randint(100000, 999999)}",
            transaction_date=datetime.now(timezone.utc),
        )
        return transaction

    async def bulk_generate(self, user_id: uuid.UUID, count: int = 50, months_back: int = 6) -> int:
        created = 0
        for _ in range(count):
            merchant_info = random.choice(MERCHANTS)
            merchant_name, cat_name, locality, city, lat, lng = merchant_info

            days_ago = random.randint(0, months_back * 30)
            txn_date = datetime.now(timezone.utc) - timedelta(days=days_ago)
            amount = round(random.uniform(10, 5000), 2)
            provider = random.choice(PROVIDERS)

            category = await self._get_or_create_category(cat_name)
            merchant = await self._get_or_create_merchant(merchant_name, category.id if category else None, merchant_info)

            await self.txn_repo.create(
                user_id=user_id,
                merchant_id=merchant.id,
                category_id=category.id if category else None,
                provider=provider,
                amount=amount,
                description=f"Payment at {merchant_name}",
                status="completed",
                payment_method=provider,
                reference_number=f"REF{random.randint(100000, 999999)}",
                transaction_date=txn_date,
            )
            created += 1
        return created

    def _find_merchant_data(self, name: str) -> tuple | None:
        for m in MERCHANTS:
            if m[0].lower() == name.lower():
                return m
        return None

    async def _get_or_create_category(self, name: str):
        cat = await self.cat_repo.get_by_name(name)
        if not cat:
            cat = await self.cat_repo.create(name=name, is_system=False)
        return cat

    async def _get_or_create_merchant(self, name: str, category_id, merchant_info):
        merchants, _ = await self.merchant_repo.list(page=1, size=1, name=name)
        if merchants:
            return merchants[0]

        if merchant_info:
            _, _, locality, city, lat, lng = merchant_info
        else:
            locality, city, lat, lng = None, None, None, None
        return await self.merchant_repo.create(
            name=name,
            category_id=category_id,
            city=city,
            locality=locality,
            lat=lat,
            lng=lng,
        )
