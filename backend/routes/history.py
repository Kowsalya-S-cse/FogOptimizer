from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from typing import List
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models import SimulationRun

router = APIRouter()


class RunOut(BaseModel):
    id: int
    created_at: datetime
    fog_nodes: int
    iot_tasks: int
    cpu_limit: float
    algorithm: str
    fog_energy: float
    cloud_energy: float
    energy_saved_percent: float
    qos_satisfaction: float
    throughput: float
    latency_ms: float

    class Config:
        from_attributes = True


@router.get("/", response_model=List[RunOut])
async def get_history(db: AsyncSession = Depends(get_db)):
    """Return last 30 simulation runs, newest first."""
    result = await db.execute(
        select(SimulationRun).order_by(SimulationRun.id.desc()).limit(30)
    )
    runs = result.scalars().all()
    return runs


@router.delete("/{run_id}")
async def delete_run(run_id: int, db: AsyncSession = Depends(get_db)):
    """Delete a specific simulation run by id."""
    result = await db.execute(select(SimulationRun).where(SimulationRun.id == run_id))
    run = result.scalars().first()
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    await db.execute(delete(SimulationRun).where(SimulationRun.id == run_id))
    await db.commit()
    return {"message": f"Run {run_id} deleted"}
