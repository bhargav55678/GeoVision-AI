from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes.upload import router as upload_router
from app.routes.compare import router as compare_router
from app.routes.history import router as history_router
from app.routes.analytics import router as analytics_router

app = FastAPI(
    title="GeoVision AI API",
    version="1.0.0",
    description="AI-Powered Satellite Change Detection Platform"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://geovision-ai-1-y7zq.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Static files
# --------------------------------------------------

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


# --------------------------------------------------
# Root
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Welcome to GeoVision AI Backend 🚀",
        "developer": "Bhargav",
        "version": "1.0.0"
    }


# --------------------------------------------------
# Health
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "success": True,
        "status": "online",
        "project": "GeoVision AI",
        "api": "working"
    }


# --------------------------------------------------
# Register routes
# --------------------------------------------------

app.include_router(upload_router)
app.include_router(compare_router)
app.include_router(history_router)
app.include_router(analytics_router)