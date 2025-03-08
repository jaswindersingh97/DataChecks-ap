from fastapi import HTTPException, Depends,UploadFile
from sqlalchemy import desc,or_
from sqlalchemy.orm import Session
from app.models.post import Post
from app.schemas.post import PostCreateSchema
from app.utils.user_utils import get_current_user
from app.utils.cloudinary_utils import upload_image_to_cloudinary

def create_post(post_data: PostCreateSchema, db: Session, user=Depends(get_current_user), file: UploadFile = None):
    # print(post_data,"postdata")
    image_url = upload_image_to_cloudinary(file) if file else None
    new_post = Post(
        title=post_data.title, 
        content=post_data.content, 
        image_url=image_url,
        created_by=user.id
        )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Post).order_by(desc(Post.created_at)).offset(skip).limit(limit).all()

def get_post(post_id: int, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

def delete_post(post_id: int, db: Session, user=Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id, Post.created_by == user.id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}

def update_post(post_id: int, post_data: PostCreateSchema, db: Session, user=Depends(get_current_user),file: UploadFile = None):
    post = db.query(Post).filter(Post.id == post_id, Post.created_by == user.id).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    
    post.title = post_data.title
    post.content = post_data.content
    if file:
        new_image_url = upload_image_to_cloudinary(file)
        if post.image_url:
            pass  
        post.image_url = new_image_url
    db.commit()
    db.refresh(post)
    return post

def search_posts_by_keyword(db: Session, keyword: str, skip: int = 0, limit: int = 10):
    # Use SQLAlchemy's `or_` to search in both title and content
    query = db.query(Post).filter(
        or_(
            Post.title.ilike(f"%{keyword}%"),  # Case-insensitive search in title
            Post.content.ilike(f"%{keyword}%")  # Case-insensitive search in content
        )
    )
    
    # Apply pagination
    posts = query.offset(skip).limit(limit).all()
    
    return posts
