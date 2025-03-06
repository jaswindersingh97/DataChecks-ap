from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import RegisterSchema, LoginSchema, UserResponseSchema
from app.services.user_service import register_user, login_user, get_current_user

router = APIRouter()

# Register Route
@router.post("/register")
def register(user_data: RegisterSchema, db: Session = Depends(get_db)):
    return register_user(user_data, db)

# Login Route
@router.post("/login")
def login(credentials: LoginSchema, db: Session = Depends(get_db)):
    return login_user(credentials, db)

# Fetch User Route (Protected)
@router.get("/fetch", response_model=UserResponseSchema)
def fetch_user(current_user: UserResponseSchema = Depends(get_current_user)):
    return current_user
