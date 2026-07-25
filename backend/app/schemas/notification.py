from datetime import datetime

from pydantic import BaseModel, Field


class NotificationOut(BaseModel):
    id: str
    title: str
    message: str
    type: str
    is_read: bool
    metadata: dict | None = Field(None, validation_alias="meta_data")
    created_at: datetime

    model_config = {"from_attributes": True, "populate_by_name": True}


class PaginatedNotifications(BaseModel):
    items: list[NotificationOut]
    total: int
    unread_count: int
    page: int
    size: int
    pages: int
