from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import SimulationRun
from services.prediction_service import run_prediction

router = APIRouter()


class InputData(BaseModel):
    fog_nodes: int
    iot_tasks: int
    cpu_limit: float
    algorithm: str


@router.post("/")
async def predict(data: InputData, db: AsyncSession = Depends(get_db)):
    result = run_prediction(data.dict())

    if "error" in result:
        return result

    # Persist this run to the database
    run = SimulationRun(
        fog_nodes=data.fog_nodes,
        iot_tasks=data.iot_tasks,
        cpu_limit=data.cpu_limit,
        algorithm=data.algorithm,
        fog_energy=result["fog_energy"],
        cloud_energy=result["cloud_energy"],
        energy_saved_percent=result["energy_saved_percent"],
        qos_satisfaction=result["qos_satisfaction"],
        throughput=result["throughput"],
        latency_ms=result.get("latency_ms", 0),
    )
    db.add(run)
    await db.commit()
    await db.refresh(run)

    # Include run id and timestamp in the response
    result["run_id"] = run.id
    result["created_at"] = run.created_at.isoformat()
    return result
