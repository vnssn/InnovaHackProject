import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, String
from sqlalchemy import Uuid as UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )

    transactions = relationship("Transaction", back_populates="user", lazy="raise", viewonly=True)
    subscriptions = relationship("Subscription", back_populates="user", lazy="raise", viewonly=True)
    notifications = relationship("Notification", back_populates="user", lazy="raise", viewonly=True)
    budgets = relationship("Budget", back_populates="user", lazy="raise", viewonly=True)
    goals = relationship("Goal", back_populates="user", lazy="raise", viewonly=True)
    conversations = relationship("AIConversation", back_populates="user", lazy="raise", viewonly=True)
    insights = relationship("AIInsight", back_populates="user", lazy="raise", viewonly=True)
