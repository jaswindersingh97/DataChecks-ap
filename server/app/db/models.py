from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, func
from sqlalchemy.orm import relationship
from app.db.session import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    posts = relationship("Post", back_populates="author")

# Blog Post Model
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)  # New field for storing image URL
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="posts")
