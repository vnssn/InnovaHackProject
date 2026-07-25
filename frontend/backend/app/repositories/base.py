import uuid
from typing import Any, Generic, TypeVar

from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: type[ModelType], db: AsyncSession):
        self.model = model
        self.db = db

    async def get(self, id: uuid.UUID | str) -> ModelType | None:
        if isinstance(id, str):
            try:
                id = uuid.UUID(id)
            except ValueError:
                return None
        result = await self.db.execute(select(self.model).where(self.model.id == id))
        return result.scalar_one_or_none()

    async def list(self, page: int = 1, size: int = 20, **filters) -> tuple[list[ModelType], int]:
        query = select(self.model)
        for field, value in filters.items():
            if value is not None and hasattr(self.model, field):
                query = query.where(getattr(self.model, field) == value)

        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        offset = (page - 1) * size
        query = query.offset(offset).limit(size)
        result = await self.db.execute(query)
        items = list(result.scalars().all())
        return items, total

    async def create(self, **kwargs) -> ModelType:
        instance = self.model(**kwargs)
        self.db.add(instance)
        await self.db.flush()
        await self.db.refresh(instance)
        return instance

    async def update(self, id: uuid.UUID, **kwargs) -> ModelType | None:
        instance = await self.get(id)
        if not instance:
            return None
        for key, value in kwargs.items():
            if value is not None and hasattr(instance, key):
                setattr(instance, key, value)
        await self.db.flush()
        await self.db.refresh(instance)
        return instance

    async def delete(self, id: uuid.UUID) -> bool:
        instance = await self.get(id)
        if not instance:
            return False
        await self.db.delete(instance)
        await self.db.flush()
        return True
