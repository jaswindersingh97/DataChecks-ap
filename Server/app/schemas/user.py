from pydantic import BaseModel, EmailStr

# Register Request Schema
class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

# Login Request Schema
class LoginSchema(BaseModel):
    email: EmailStr
    password: str

# User Response Schema (fetch user)
class UserResponseSchema(BaseModel):
    name: str
    email: str
