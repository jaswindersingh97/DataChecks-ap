from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.post import PostCreateSchema, PostResponseSchema
from app.services.post_service import create_post, get_posts, get_post, update_post, delete_post
from app.utils.user_utils import get_current_user
from app.core.database import get_db

post_router = APIRouter()

# Create Post
@post_router.post("/", response_model=PostResponseSchema)
def create_new_post(post_data: PostCreateSchema, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return create_post(post_data, db, user)

# Get All Posts
@post_router.get("/")
def fetch_posts(db: Session = Depends(get_db)):
    return get_posts(db)

# Get Single Post
@post_router.get("/{post_id}")
def fetch_post(post_id: int, db: Session = Depends(get_db)):
    return get_post(post_id, db)

# Update Post
@post_router.put("/{post_id}")
def modify_post(post_id: int, post_data: PostCreateSchema, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return update_post(post_id, post_data, db, user)

# Delete Post
@post_router.delete("/{post_id}")
def remove_post(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return delete_post(post_id, db, user)
