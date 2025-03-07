from pydantic import BaseModel
from typing import Optional

class PostCreateSchema(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None  # Optional image URL


class PostResponseSchema(BaseModel):
    id: int
    title: str
    content: str
    created_by: int

    class Config:
        from_attributes = True
