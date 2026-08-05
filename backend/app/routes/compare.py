from fastapi import APIRouter, UploadFile, File
from app.services.comparison import compare_images
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/compare")
async def compare(
    before: UploadFile = File(...),
    after: UploadFile = File(...)
):

    before_path = os.path.join(UPLOAD_FOLDER, before.filename)
    after_path = os.path.join(UPLOAD_FOLDER, after.filename)

    with open(before_path, "wb") as buffer:
        shutil.copyfileobj(before.file, buffer)

    with open(after_path, "wb") as buffer:
        shutil.copyfileobj(after.file, buffer)

    result = compare_images(before.filename, after.filename)

    return {
        "success": True,
        "comparison_image": result["image"],
        "changed_regions": result["changed_regions"],
        "changed_area_percentage": result["changed_area_percentage"],
        "message": "Comparison completed successfully."
    }