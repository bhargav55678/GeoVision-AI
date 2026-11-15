from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi.responses import FileResponse
from app.routes.upload import router as upload_router
from app.routes.compare import router as compare_router
from app.routes.history import router as history_router
from app.routes.analytics import router as analytics_router
from app.routes.auth import router as auth_router
from app.routes.files import router as files_router
from pathlib import Path
from app.migrations import initialize_database

app = FastAPI(
    title="GeoVision AI API",
    version="1.0.0",
    description="AI-Powered Satellite Change Detection Platform"
)

initialize_database()


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
# Public static artwork
# --------------------------------------------------

@app.get("/public-assets/{filename}")
def get_public_asset(filename: str):
    if filename not in {"earth.jpg", "earth2.jpg"}:
        raise HTTPException(status_code=404, detail="Asset not found")

    path = Path("uploads") / filename
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Asset not found")

    return FileResponse(path)


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
app.include_router(auth_router)
app.include_router(files_router)