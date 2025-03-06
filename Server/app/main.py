from fastapi import FastAPI
from app.routes.user_routes import router as user_router
from app.dependencies import setup_cors
from app.core.database import Base, engine

app = FastAPI()

# Apply CORS middleware
setup_cors(app)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(user_router)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}
