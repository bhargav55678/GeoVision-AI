import os
from datetime import datetime, timedelta, timezone

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerifyMismatchError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User


password_hasher = PasswordHasher()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    try:
        return password_hasher.verify(hashed_password, password)
    except (InvalidHashError, VerifyMismatchError):
        return False


def _jwt_settings() -> tuple[str, int]:
    secret = os.getenv("JWT_SECRET_KEY")
    if not secret:
        raise RuntimeError("JWT_SECRET_KEY environment variable is required")

    try:
        expires_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    except ValueError as error:
        raise RuntimeError(
            "ACCESS_TOKEN_EXPIRE_MINUTES must be an integer"
        ) from error

    if expires_minutes <= 0:
        raise RuntimeError("ACCESS_TOKEN_EXPIRE_MINUTES must be positive")

    return secret, expires_minutes


def create_access_token(user_id: int) -> tuple[str, int]:
    secret, expires_minutes = _jwt_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes
    )
    token = jwt.encode(
        {
            "sub": str(user_id),
            "exp": expires_at,
        },
        secret,
        algorithm="HS256",
    )
    return token, expires_minutes * 60


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        secret, _ = _jwt_settings()
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        subject = payload.get("sub")
        user_id = int(subject)
    except (RuntimeError, jwt.InvalidTokenError, TypeError, ValueError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise credentials_exception

    return user
