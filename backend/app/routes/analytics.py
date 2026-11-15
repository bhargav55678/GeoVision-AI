from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.auth import get_current_user
from app.database import get_db
from app.models.analysis import Analysis
from app.models.user import User


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/")
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_filter = Analysis.user_id == current_user.id

    # -----------------------------------------
    # Total analyses
    # -----------------------------------------

    total_analyses = (
        db.query(Analysis)
        .filter(user_filter)
        .count()
    )


    # -----------------------------------------
    # Changes detected
    # -----------------------------------------

    changes_detected = (
        db.query(Analysis)
        .filter(
            user_filter,
            Analysis.status == "Change Detected"
        )
        .count()
    )


    # -----------------------------------------
    # No change
    # -----------------------------------------

    no_change = (
        db.query(Analysis)
        .filter(
            user_filter,
            Analysis.status == "No Change"
        )
        .count()
    )


    # -----------------------------------------
    # Average changed area
    # -----------------------------------------

    average_changed_area = (
        db.query(
            func.avg(
                Analysis.changed_area_percentage
            )
        )
        .filter(user_filter)
        .scalar()
    )


    # -----------------------------------------
    # Average confidence
    # -----------------------------------------

    average_confidence = (
        db.query(
            func.avg(
                Analysis.confidence
            )
        )
        .filter(user_filter)
        .scalar()
    )


    # -----------------------------------------
    # Daily analysis count
    # -----------------------------------------

    daily_results = (
        db.query(
            func.date(Analysis.created_at).label("date"),
            func.count(Analysis.id).label("count")
        )
        .filter(user_filter)
        .group_by(
            func.date(Analysis.created_at)
        )
        .order_by(
            func.date(Analysis.created_at)
        )
        .all()
    )


    daily_analyses = [
        {
            "date": str(row.date),
            "count": row.count
        }
        for row in daily_results
    ]


    # -----------------------------------------
    # Return analytics
    # -----------------------------------------

    return {
        "total_analyses": total_analyses,

        "changes_detected": changes_detected,

        "no_change": no_change,

        "average_changed_area": round(
            average_changed_area or 0,
            2
        ),

        "average_confidence": round(
            average_confidence or 0,
            2
        ),

        "daily_analyses": daily_analyses
    }