import asyncio
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import async_session, engine, Base
from app.core.security import hash_password
from app.models.category import Category
from app.models.transaction import Transaction
from app.models.user import User
from app.services.dummy_gateway_service import DummyGatewayService


DEMO_ACCOUNTS = [
    {"email": "demo@example.com", "name": "Demo User"},
    {"email": "example@gmail.com", "name": "Example User"},
]
DEMO_PASSWORD = "password123"


async def ensure_user(db: AsyncSession, email: str, name: str) -> User:
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user:
        user.hashed_password = hash_password(DEMO_PASSWORD)
        if not user.name:
            user.name = name
        return user

    user = User(
        id=uuid.uuid4(),
        email=email,
        hashed_password=hash_password(DEMO_PASSWORD),
        name=name,
        phone="+919999999999",
    )
    db.add(user)
    await db.flush()
    return user


async def ensure_system_categories(db: AsyncSession) -> None:
    existing = await db.execute(select(Category))
    if existing.scalars().first():
        return

    system_categories = [
        "Food", "Cafe", "Restaurant", "Travel", "Fuel", "Shopping",
        "Lifestyle", "Entertainment", "Groceries", "Healthcare",
        "Education", "Rent", "Bills", "Subscriptions", "Investments",
        "Salary", "Transfers", "Others",
    ]
    for cat_name in system_categories:
        db.add(Category(name=cat_name, is_system=True))
    await db.flush()


async def ensure_transactions(db: AsyncSession, user: User) -> int:
    existing = await db.execute(select(Transaction.id).where(Transaction.user_id == user.id).limit(1))
    if existing.first():
        return 0

    gateway = DummyGatewayService(db)
    return await gateway.bulk_generate(user.id, count=100, months_back=6)


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        users = [await ensure_user(db, account["email"], account["name"]) for account in DEMO_ACCOUNTS]
        await ensure_system_categories(db)

        created_counts = []
        for user in users:
            created_counts.append((user.email, await ensure_transactions(db, user)))

        await db.commit()

        for email, created in created_counts:
            if created:
                print(f"Seeded demo account: {email} / {DEMO_PASSWORD}")
                print(f"Generated {created} dummy transactions")
            else:
                print(f"Demo account already seeded: {email} / {DEMO_PASSWORD}")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
