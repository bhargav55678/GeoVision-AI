from fastapi import APIRouter, Depends, File, UploadFile

from app.auth import get_current_user
from app.models.user import User
from app.services.image_processing import process_image
from app.storage import save_upload

router = APIRouter()

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    filename = save_upload(file)

    # Process the image
    processed_image = process_image(filename)

    # Return response
    return {
        "success": True,
        "filename": filename,
        "processed_image": processed_image,
        "message": "Image uploaded and processed successfully!"
    }