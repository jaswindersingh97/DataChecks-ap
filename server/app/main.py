from fastapi import FastAPI
from app.db.session import get_db

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Blogi API is running!"}
