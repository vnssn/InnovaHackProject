from pydantic import BaseModel


class HeatmapPoint(BaseModel):
    lat: float
    lng: float
    weight: float
    category: str | None = None


class HeatmapResponse(BaseModel):
    points: list[HeatmapPoint]


class ClusterPoint(BaseModel):
    lat: float
    lng: float
    count: int
    total: float


class ClustersResponse(BaseModel):
    clusters: list[ClusterPoint]


class CitySpending(BaseModel):
    city: str
    total: float
    count: int
    percentage: float


class TopCitiesResponse(BaseModel):
    items: list[CitySpending]


class LocalitySpending(BaseModel):
    locality: str
    city: str
    total: float
    count: int


class TopLocalitiesResponse(BaseModel):
    items: list[LocalitySpending]
