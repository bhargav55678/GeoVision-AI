from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    before_image = Column(
        String,
        nullable=False
    )

    after_image = Column(
        String,
        nullable=False
    )

    comparison_image = Column(
        String,
        nullable=False
    )

    changed_regions = Column(
        Integer,
        default=0
    )

    changed_area_percentage = Column(
        Float,
        default=0.0
    )

    status = Column(
        String,
        default="No Change"
    )

    confidence = Column(
        Float,
        default=98.0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True,
        index=True
    )

    user = relationship("User", back_populates="analyses")