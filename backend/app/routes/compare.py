from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.services.comparison import compare_images
from app.database import get_db
from app.models.analysis import Analysis
from app.models.user import User
from app.storage import save_upload


router = APIRouter()

@router.post("/compare")
async def compare(
    before: UploadFile = File(...),
    after: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    before_filename = save_upload(before)
    after_filename = save_upload(after)

    # Run image comparison

    result = compare_images(
        before_filename,
        after_filename
    )

    # Determine status

    status = (
        "Change Detected"
        if result["changed_regions"] > 0
        else "No Change"
    )

    # Save analysis to database

    analysis = Analysis(
        before_image=before_filename,
        after_image=after_filename,
        comparison_image=result["image"],
        changed_regions=result["changed_regions"],
        changed_area_percentage=result[
            "changed_area_percentage"
        ],
        status=status,
        confidence=98.0,
        user_id=current_user.id,
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