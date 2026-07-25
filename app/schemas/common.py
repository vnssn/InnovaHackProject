from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class PaginationParams:
    def __init__(self, page: int = 1, size: int = 20):
        self.page = page
        self.size = min(size, 100)
        self.offset = (page - 1) * size
