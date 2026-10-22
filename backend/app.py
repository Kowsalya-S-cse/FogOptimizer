from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

# Existing routers
from routes.health import router as health_router
from routes.predict import router as predict_router
from routes.analysis import router as analysis_router

# Settings router
from routes.settings import router as settings_router

# History router
from routes.history import router as history_router

# Database
from database import init_db

app = FastAPI(
    title="Fog Energy & QoS Backend",
    version="1.1"
)

# Enable frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(health_router, prefix="/health", tags=["Health"])
app.include_router(predict_router, prefix="/predict", tags=["Prediction"])
app.include_router(analysis_router, prefix="/analysis", tags=["Analysis"])
app.include_router(settings_router, prefix="/settings", tags=["Settings"])
app.include_router(history_router, prefix="/history", tags=["History"])


@app.on_event("startup")
async def on_startup():
    """Initialise the SQLite database and create tables on first run."""
    await init_db()


@app.get("/")
def root():
    return {
        "status": "Fog Backend Running",
        "version": "1.1",
        "docs_url": "/docs",
        "api": "FastAPI"
    }


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Silences browser favicon requests cleanly with 204 No Content."""
    return Response(status_code=204)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)