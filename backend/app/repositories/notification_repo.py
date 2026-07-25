import uuid

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification
from app.repositories.base import BaseRepository


class NotificationRepository(BaseRepository[Notification]):
    def __init__(self, db: AsyncSession):
        super().__init__(Notification, db)

    async def list_by_user(
        self, user_id: uuid.UUID, page: int = 1, size: int = 20, unread_only: bool = False
    ) -> tuple[list[Notification], int, int]:
        query = select(Notification).where(Notification.user_id == user_id)
        if unread_only:
            query = query.where(Notification.is_read == False)

        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = total_result.scalar() or 0

        unread_result = await self.db.execute(
            select(func.count()).where(Notification.user_id == user_id, Notification.is_read == False)
        )
        unread_count = unread_result.scalar() or 0

        offset = (page - 1) * size
        query = query.offset(offset).limit(size).order_by(Notification.created_at.desc())
        result = await self.db.execute(query)
        items = list(result.scalars().all())
        return items, total, unread_count

    async def mark_all_read(self, user_id: uuid.UUID) -> None:
        await self.db.execute(
            update(Notification).where(
                Notification.user_id == user_id, Notification.is_read == False
            ).values(is_read=True)
        )
        await self.db.flush()
