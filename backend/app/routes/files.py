from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models.analysis import Analysis
from app.models.user import User
from app.storage import normalize_stored_path, resolve_upload_path


router = APIRouter(prefix="/files", tags=["Protected Files"])


@router.get("/{file_path:path}")
def get_file(
    file_path: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    normalized_path = normalize_stored_path(file_path)
    candidates = {normalized_path}
    if normalized_path.startswith("uploads/"):
        candidates.add(normalized_path.removeprefix("uploads/"))
    else:
        candidates.add(f"uploads/{normalized_path}")

    owned_file = (
        db.query(Analysis)
        .filter(
            Analysis.user_id == current_user.id,
            or_(
                Analysis.before_image.in_(candidates),
                Analysis.after_image.in_(candidates),
                Analysis.comparison_image.in_(candidates),
            ),
        )
        .first()
    )
    if not owned_file:
        raise HTTPException(status_code=404, detail="File not found")

    try:
        path = resolve_upload_path(normalized_path)
    except ValueError as error:
        raise HTTPException(status_code=404, detail="File not found") from error

    if not path.is_file():
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(path)
