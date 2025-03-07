from fastapi import FastAPI,Request
from app.routes.user_routes import router as user_router
from app.dependencies import setup_cors
from app.core.database import Base, engine
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from app.routes.post_routes import post_router

import logging
import sys

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)  # Logs to console
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Exception handler for detailed error logging
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
    )

# Apply CORS middleware
setup_cors(app)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routes
# app.include_router(user_router)
app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(post_router, prefix="/posts", tags=["Posts"])

@app.get("/")
def read_root():
    print("🛠️ This test route is running!")
    return {"message": "FastAPI is not running!"}
