from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostCreateSchema(BaseModel):
    title: str
    content: str
    #image_url: Optional[str] = None  # Optional image URL


class PostResponseSchema(BaseModel):
    id: int
    title: str
    content: str
    image_url: str | None
    created_by: int
    created_at: datetime
    class Config:
        from_attributes = True
