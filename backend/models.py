from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class UserSettings(Base):
    """Persistent user settings stored in SQLite."""
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    theme = Column(String, default="dark")
    notifications_enabled = Column(Boolean, default=True)


class SimulationRun(Base):
    """Records every simulation run with its inputs and outputs."""
    __tablename__ = "simulation_runs"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Inputs
    fog_nodes = Column(Integer)
    iot_tasks = Column(Integer)
    cpu_limit = Column(Float)
    algorithm = Column(String)

    # Outputs
    fog_energy = Column(Float)
    cloud_energy = Column(Float)
    energy_saved_percent = Column(Float)
    qos_satisfaction = Column(Float)
    throughput = Column(Float)
    latency_ms = Column(Float)
