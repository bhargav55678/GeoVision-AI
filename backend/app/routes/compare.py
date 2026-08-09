from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.services.comparison import compare_images
from app.database import get_db
from app.models.analysis import Analysis

import shutil
import os


router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.post("/compare")
async def compare(
    before: UploadFile = File(...),
    after: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Save uploaded images

    before_path = os.path.join(
        UPLOAD_FOLDER,
        before.filename
    )

    after_path = os.path.join(
        UPLOAD_FOLDER,
        after.filename
    )

    with open(before_path, "wb") as buffer:
        shutil.copyfileobj(
            before.file,
            buffer
        )

    with open(after_path, "wb") as buffer:
        shutil.copyfileobj(
            after.file,
            buffer
        )

    # Run image comparison

    result = compare_images(
        before.filename,
        after.filename
    )

    # Determine status

    status = (
        "Change Detected"
        if result["changed_regions"] > 0
        else "No Change"
    )

    # Save analysis to database

    analysis = Analysis(
        before_image=before.filename,
        after_image=after.filename,
        comparison_image=result["image"],
        changed_regions=result["changed_regions"],
        changed_area_percentage=result[
            "changed_area_percentage"
        ],
        status=status,
        confidence=98.0
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    # Return response to frontend

    return {
        "success": True,
        "id": analysis.id,
        "comparison_image": result["image"],
        "changed_regions": result["changed_regions"],
        "changed_area_percentage": result[
            "changed_area_percentage"
        ],
        "status": status,
        "confidence": 98.0,
        "message": "Comparison completed successfully."
    }