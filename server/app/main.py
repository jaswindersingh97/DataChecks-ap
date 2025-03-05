from fastapi import FastAPI
from app.db.session import get_db
from app.middlewares.middlewares import setup_middlewares

app = FastAPI()
setup_middlewares(app)

@app.get("/")
def home():
    return {"message": "Blogi API is running!"}
