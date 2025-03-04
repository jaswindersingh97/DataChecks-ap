from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time

def setup_middlewares(app: FastAPI):
    # CORS Middleware (Allows frontend to access backend)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Change this to your frontend URL in production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Custom Middleware for Logging Requests
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        print(f"Request: {request.method} {request.url} - {process_time:.2f}s")
        return response
