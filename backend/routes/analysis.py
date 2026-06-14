from fastapi import APIRouter
from services.energy_service import energy_summary
from services.qos_service import qos_summary

router = APIRouter()

@router.get("/analysis")
def analysis():
    return {
        "energy_analysis": energy_summary(),
        "qos_analysis": qos_summary()
    }