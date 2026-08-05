from app.services.image_processing import process_image
from fastapi import APIRouter, UploadFile, File
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Process the image
    processed_image = process_image(file.filename)

    # Return response
    return {
        "success": True,
        "filename": file.filename,
        "processed_image": processed_image,
        "message": "Image uploaded and processed successfully!"
    }