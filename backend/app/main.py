from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.upload import router as upload_router
from app.routes.compare import router as compare_router

app = FastAPI(
    title="GeoVision AI API",
    version="1.0.0",
    description="AI-Powered Satellite Change Detection Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Welcome to GeoVision AI Backend 🚀",
        "developer": "Bhargav",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {
        "success": True,
        "status": "online",
        "project": "GeoVision AI",
        "api": "working"
    }

# Register routes
app.include_router(upload_router)
app.include_router(compare_router)