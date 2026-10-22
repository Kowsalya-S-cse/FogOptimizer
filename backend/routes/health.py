from fastapi import APIRouter

router = APIRouter()


@router.get("/")
@router.get("")
def health():
    return {
        "status": "healthy",
        "service": "EcoFog AI Backend",
        "ml_engine": "RandomForestRegressor"
    }