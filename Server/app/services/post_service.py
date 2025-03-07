from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.post import Post
from app.schemas.post import PostCreateSchema
from app.utils.user_utils import get_current_user

def create_post(post_data: PostCreateSchema, db: Session, user=Depends(get_current_user)):
    new_post = Post(title=post_data.title, content=post_data.content, created_by=user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def get_posts(db: Session):
    return db.query(Post).all()

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

def update_post(post_id: int, post_data: PostCreateSchema, db: Session, user=Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id, Post.created_by == user.id).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    
    post.title = post_data.title
    post.content = post_data.content
    db.commit()
    db.refresh(post)
    
    return post
