import asyncio
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import async_session, engine, Base
from app.core.security import hash_password
from app.models.category import Category
from app.models.user import User
from app.services.dummy_gateway_service import DummyGatewayService


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        existing = await db.execute(select(User).where(User.email == "demo@example.com"))
        if existing.scalar_one_or_none():
            print("Seed data already exists. Skipping.")
            await engine.dispose()
            return

        demo_user = User(
            id=uuid.uuid4(),
            email="demo@example.com",
            hashed_password=hash_password("demo123"),
            name="Demo User",
            phone="+919999999999",
        )
        db.add(demo_user)
        await db.flush()

        system_categories = [
            "Food", "Cafe", "Restaurant", "Travel", "Fuel", "Shopping",
            "Lifestyle", "Entertainment", "Groceries", "Healthcare",
            "Education", "Rent", "Bills", "Subscriptions", "Investments",
            "Salary", "Transfers", "Others",
        ]
        for cat_name in system_categories:
            db.add(Category(name=cat_name, is_system=True))
        await db.flush()

        gateway = DummyGatewayService(db)
        created = await gateway.bulk_generate(demo_user.id, count=100, months_back=6)
        await db.commit()
        print(f"Created demo user: demo@example.com / demo123")
        print(f"Generated {created} dummy transactions")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
