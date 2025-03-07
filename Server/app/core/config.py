import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    DATABASE_URL:str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/db_name")
    SECRET_KEY:str = os.getenv("SECRET_KEY", "your-secret-key")
    ALGORITHM:str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES :int = 30
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    class Config:
        env_file = ".env"



settings = Settings()
