from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.analysis import Analysis


router = APIRouter(
    prefix="/history",
    tags=["Analysis History"]
)


# Get all analysis history

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


# Get a single analysis by ID

@router.get("/{analysis_id}")
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db)
):

    analysis = (
        db.query(Analysis)
        .filter(Analysis.id == analysis_id)
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return {
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