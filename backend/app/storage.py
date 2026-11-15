import os
import uuid
from pathlib import Path

from fastapi import UploadFile


UPLOAD_ROOT = Path("uploads")


def save_upload(file: UploadFile) -> str:
    UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
    extension = Path(file.filename or "").suffix.lower()
    filename = f"{uuid.uuid4().hex}{extension}"
    destination = UPLOAD_ROOT / filename
    with destination.open("wb") as buffer:
        while chunk := file.file.read(1024 * 1024):
            buffer.write(chunk)
    return filename


def resolve_upload_path(relative_path: str) -> Path:
    normalized = relative_path.replace("\\", "/").lstrip("/")
    if normalized.startswith("uploads/"):
        normalized = normalized.removeprefix("uploads/")

    root = UPLOAD_ROOT.resolve()
    candidate = (root / normalized).resolve()
    if candidate != root and root not in candidate.parents:
        raise ValueError("Invalid file path")
    return candidate


def normalize_stored_path(path: str) -> str:
    return path.replace(os.sep, "/").lstrip("/")
