import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.repositories.notification_repo import NotificationRepository
from app.schemas.common import MessageResponse
from app.schemas.notification import NotificationOut, PaginatedNotifications
from app.utils.pagination import paginate

router = APIRouter(prefix="/notifications", tags=["Notifications"])


def notif_to_out(n):
    return NotificationOut(
        id=str(n.id),
        title=n.title,
        message=n.message,
        type=n.type,
        is_read=n.is_read,
        metadata=n.meta_data,
        created_at=n.created_at,
    )


@router.get("", response_model=PaginatedNotifications)
async def list_notifications(
    unread_only: bool = Query(False),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = NotificationRepository(db)
    items, total, unread_count = await repo.list_by_user(user.id, page, size, unread_only)
    return {
        **paginate([notif_to_out(n) for n in items], total, page, size),
        "unread_count": unread_count,
    }


@router.patch("/{id}/read", response_model=NotificationOut)
async def mark_read(
    id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = NotificationRepository(db)
    n = await repo.get(uuid.UUID(id))
    if not n or n.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    await repo.update(uuid.UUID(id), is_read=True)
    n.is_read = True
    return notif_to_out(n)


@router.patch("/read-all", response_model=MessageResponse)
async def mark_all_read(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    repo = NotificationRepository(db)
    await repo.mark_all_read(user.id)
    return MessageResponse(message="All notifications marked as read")
