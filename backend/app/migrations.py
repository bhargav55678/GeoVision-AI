import shutil
from datetime import datetime
from pathlib import Path
from app.models.user import User
from app.models.analysis import Analysis

from sqlalchemy import inspect, text

from app.database import Base, engine


def _database_path() -> Path | None:
    database_url = str(engine.url)
    if not database_url.startswith("sqlite:///"):
        return None

    raw_path = database_url.removeprefix("sqlite:///")
    path = Path(raw_path)
    if not path.is_absolute():
        path = Path.cwd() / path
    return path


def initialize_database() -> None:
    database_path = _database_path()
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()

    if "analyses" in existing_tables:
        columns = {
            column["name"] for column in inspector.get_columns("analyses")
        }
        if "user_id" not in columns:
            if database_path and database_path.exists():
                timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
                backup_path = database_path.with_name(
                    f"{database_path.stem}.backup-{timestamp}{database_path.suffix}"
                )
                shutil.copy2(database_path, backup_path)

            with engine.begin() as connection:
                connection.execute(
                    text("ALTER TABLE analyses ADD COLUMN user_id INTEGER")
                )

    Base.metadata.create_all(bind=engine)
