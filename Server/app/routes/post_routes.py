from fastapi import APIRouter, Depends, HTTPException,UploadFile,File,Form, Query
from sqlalchemy.orm import Session
from app.schemas.post import PostCreateSchema, PostResponseSchema
from app.services.post_service import create_post, get_posts, get_post, update_post, delete_post, search_posts_by_keyword
from app.utils.user_utils import get_current_user
from app.core.database import get_db

post_router = APIRouter()

# Create Post
@post_router.post("/", response_model=PostResponseSchema)
def create_new_post(
    title: str = Form(...),
    content: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    post_data = PostCreateSchema(title=title, content=content)
    print(post_data)
    return create_post(post_data, db, user,file)

# Get All Posts
@post_router.get("/")
def fetch_posts(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return get_posts(db, skip, limit)

# Search Post
@post_router.get("/search", response_model=list[PostResponseSchema])
def search_posts(
    keyword: str = Query(..., description="Search keyword for title or content"),
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return search_posts_by_keyword(db, keyword, skip, limit)

# Get Single Post
@post_router.get("/{post_id}")
def fetch_post(post_id: int, db: Session = Depends(get_db)):
    return get_post(post_id, db)

# Update Post
@post_router.put("/{post_id}",response_model=PostResponseSchema)
def modify_post(
    post_id: int,
    title: str = Form(...),
    content: str = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    post_data = PostCreateSchema(title=title, content=content)
    return update_post(post_id, post_data, db, user,file)

# Delete Post
@post_router.delete("/{post_id}")
def remove_post(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return delete_post(post_id, db, user)
