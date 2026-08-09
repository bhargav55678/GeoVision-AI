from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.analysis import Analysis

router = APIRouter(
    prefix="/history",
    tags=["Analysis History"]
)


@router.get("/")
def get_history(db: Session = Depends(get_db)):

    analyses = (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .all()
    )

    return [
        {
            "id": analysis.id,
            "before_image": analysis.before_image,
            "after_image": analysis.after_image,
            "comparison_image": analysis.comparison_image,
            "changed_regions": analysis.changed_regions,
            "changed_area_percentage": analysis.changed_area_percentage,
            "status": analysis.status,
            "confidence": analysis.confidence,
            "created_at": analysis.created_at,
        }
        for analysis in analyses
    ]