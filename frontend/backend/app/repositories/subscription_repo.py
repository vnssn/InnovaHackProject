from app.models.subscription import Subscription
from app.repositories.base import BaseRepository


class SubscriptionRepository(BaseRepository[Subscription]):
    def __init__(self, db):
        super().__init__(Subscription, db)
