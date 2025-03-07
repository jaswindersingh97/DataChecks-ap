from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.User import User

from app.schemas.user import RegisterSchema, LoginSchema
from app.utils.user_utils import hash_password, verify_password, create_jwt, get_current_user

def create_post(user_data: RegisterSchema, db: Session):
    print(user_data)
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pwd = hash_password(user_data.password)
    new_user = User(name=user_data.name, email=user_data.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created", "id": new_user.id, "name": new_user.name, "email": new_user.email}

def login_user(credentials: LoginSchema, db: Session):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt({"user_id": user.id})
    return {"message": "Login successful", "access_token": token}
