from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from utils.config import Config

# Use aiosqlite as the async SQLite driver
engine = create_async_engine(
    f"sqlite+aiosqlite:///{Config.DB_PATH}",
    echo=False,
    future=True,
)

# Session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def init_db():
    """Create all tables on startup if they do not yet exist."""
    from models import Base  # local import to avoid circular dependency
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncSession:
    """FastAPI dependency that yields a database session."""
    async with AsyncSessionLocal() as session:
        yield session
