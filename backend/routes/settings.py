from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import get_db
from models import UserSettings

router = APIRouter()


class SettingsModel(BaseModel):
    theme: str
    notifications_enabled: bool

    class Config:
        from_attributes = True  # Pydantic v2 / orm_mode for v1


# ── GET /settings/ ───────────────────────────────────────────────────────────
@router.get("/", response_model=SettingsModel)
async def get_settings(db: AsyncSession = Depends(get_db)):
    """Return the current user settings from the database."""
    result = await db.execute(select(UserSettings).limit(1))
    row = result.scalars().first()

    if row is None:
        # First-time: persist default values
        row = UserSettings(theme="dark", notifications_enabled=True)
        db.add(row)
        await db.commit()
        await db.refresh(row)

    return row


# ── POST /settings/ ──────────────────────────────────────────────────────────
@router.post("/", response_model=SettingsModel)
async def save_settings(settings: SettingsModel, db: AsyncSession = Depends(get_db)):
    """Save (create or update) user settings in the database."""
    result = await db.execute(select(UserSettings).limit(1))
    row = result.scalars().first()

    if row:
        row.theme = settings.theme
        row.notifications_enabled = settings.notifications_enabled
    else:
        row = UserSettings(**settings.model_dump())
        db.add(row)

    await db.commit()
    await db.refresh(row)
    return row