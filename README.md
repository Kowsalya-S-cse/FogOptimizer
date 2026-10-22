# EcoFog AI
### Intelligent Energy-Aware Fog Resource Allocation and QoS Optimization for IoT Applications

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB.svg?style=flat&logo=python)](https://www.python.org)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-F7931E.svg?style=flat&logo=scikit-learn)](https://scikit-learn.org)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20Async-003B57.svg?style=flat&logo=sqlite)](https://sqlite.org)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-Google%20Drive-4285F4.svg?style=flat&logo=googledrive)](https://drive.google.com/file/d/1-qmOzzXmVRjyCnccDYbi00EFC__S06dX/view?usp=drivesdk)

> 🎥 **Project Video Demo:** [Watch the EcoFog AI Walkthrough on Google Drive](https://drive.google.com/file/d/1-qmOzzXmVRjyCnccDYbi00EFC__S06dX/view?usp=drivesdk)

---

## 📌 Project Overview

**EcoFog AI** is an intelligent Edge-Fog-Cloud orchestration framework designed to optimize resource allocation for time-critical IoT applications. The system dynamically partitions and schedules sensor workloads across localized fog nodes and centralized cloud servers based on task deadlines, compute intensity, and energy consumption thresholds.

By employing the **IEERA-Fog** (Intelligent Energy-Efficient Resource Allocation) algorithm backed by a trained Multi-Output **Random Forest Regressor** over 10,000 empirical scheduling cycles, the framework achieves:
- **Up to 40% reduction in overall energy consumption** compared to traditional cloud offloading.
- **Over 92% QoS deadline satisfaction** under heavy load.
- **Significant latency minimization** through localized fog edge execution.

---

## 🚀 Key Features

- ⚡ **Dynamic Fog-Cloud Workload Partitioning:** Evaluates deadline urgency and node energy states to determine whether to execute locally, distribute to fog peers, or offload to the cloud.
- 🧠 **ML-Driven Multi-Output Prediction:** Real-time inference predicting Fog Energy, Cloud Baseline Energy, Energy Savings %, QoS Satisfaction %, and System Throughput.
- ⚙️ **Comprehensive Scheduling Benchmarking:** Compare 5 distinct scheduling algorithms in real-time:
  1. **QoS Aware Heuristic (IEERA-Fog)**
  2. **Reinforcement Learning (Q-Learning Formulation)**
  3. **Energy-Optimized Bin Packing (First Fit Decreasing)**
  4. **Round Robin**
  5. **FCFS (First Come First Serve)**
- 📊 **Real-Time Interactive Dashboard:** Live telemetry monitoring, dynamic chart visualizations (Recharts), and system health metrics.
- 💾 **Asynchronous Persistent History:** SQLite integration using SQLAlchemy 2.0 and `aiosqlite` for persistent run tracking and CSV report exports.
- 🔒 **Role-Based Session Authentication:** Modern glassmorphism UI with instant demo evaluator mode for quick physical demonstrations.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   IoT Sensor Layer                     │
│    (Smart City, Health Sensors, Industrial Telemetry)  │
└───────────────────────────┬────────────────────────────┘
                            │ MQTT / HTTP Requests
                            ▼
┌────────────────────────────────────────────────────────┐
│             EcoFog AI Scheduling Gateway               │
│                                                        │
│  ┌──────────────────┐   ┌───────────────────────────┐  │
│  │ Priority Engine  │   │  ML Inference Engine      │  │
│  │ (Deadline Slack) │   │  (Random Forest Regressor)│  │
│  └─────────┬────────┘   └─────────────┬─────────────┘  │
│            └──────────────┬───────────┘                │
│                           ▼                            │
│           IEERA-Fog Resource Allocator                 │
└───────────────┬───────────────────────────┬────────────┘
                │ Low Latency               │ Overflow
                ▼                           ▼
    ┌──────────────────────┐    ┌────────────────────────┐
    │      Fog Layer       │    │      Cloud Layer       │
    │ (Distributed Nodes)  │    │  (Central Data Center) │
    └──────────────────────┘    └────────────────────────┘
```

---

## 🧠 Technologies Used

### Frontend
- **React 18** (Modern functional components & Hooks)
- **React Router DOM v6** (Client-side routing with auth guards)
- **Recharts** (Interactive SVG analytics charts for energy & latency)
- **Lucide React** (Clean, modern iconography)
- **Axios** (Configurable REST client with unified API base URL)
- **Modern CSS** (Dark mode glassmorphism design system)

### Backend
- **FastAPI** (High-throughput async Python ASGI web framework)
- **Uvicorn** (Lightning-fast ASGI server)
- **SQLAlchemy 2.0 (Async)** & **aiosqlite** (Non-blocking database persistence)
- **Pydantic v2** (Strict data validation and schema serialization)
- **Unittest & Starlette TestClient** (Complete automated test coverage)

### Machine Learning
- **Scikit-learn** (Multi-Output RandomForestRegressor, DecisionTreeRegressor)
- **StandardScaler & Joblib** (Feature normalization pipeline and model serialization)
- **Empirical Dataset:** 10,000 real simulation cycles of IoT fog scheduling metrics

---

## 📂 Project Structure

```bash
FogOptimizer/
│
├── backend/
│   ├── ml/
│   │   ├── train_models.py      # Automated training pipeline for RF & DT
│   │   └── scaler.pkl           # Feature normalizer
│   ├── models/
│   │   ├── rf_model.pkl         # Trained Multi-Output Random Forest model
│   │   ├── dt_model.pkl         # Trained Decision Tree model
│   │   └── model_metrics.pkl    # Stored R2, MAE, and feature names
│   ├── routes/
│   │   ├── health.py            # /health service status
│   │   ├── predict.py           # /predict/ ML inference & database logging
│   │   ├── history.py           # /history/ CRUD past simulation runs
│   │   ├── settings.py          # /settings/ theme and notification configs
│   │   └── analysis.py          # /analysis/ energy & QoS summary
│   ├── services/
│   │   ├── prediction_service.py # Real-time ML inference & latency engine
│   │   ├── energy_service.py     # Energy aggregation logic
│   │   └── qos_service.py        # QoS metrics logic
│   ├── tests/
│   │   ├── test_api.py          # API integration tests
│   │   └── test_prediction.py   # Machine learning inference tests
│   ├── app.py                   # FastAPI main application & CORS setup
│   ├── database.py              # Async database connection engine
│   ├── models.py                # SQLAlchemy ORM schemas
│   ├── settings.db              # SQLite persistence database
│   ├── requirements.txt         # Python dependencies
│   └── fog_scheduling_dataset_custom_algo.csv # 10,000 dataset rows
│
├── qos_frontend/
│   ├── public/                  # HTML templates & static assets
│   ├── src/
│   │   ├── charts/
│   │   │   ├── EnergyChart.jsx  # Recharts Pie & Donut chart
│   │   │   └── LatencyChart.jsx # Recharts comparative Bar chart
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Interactive brand & telemetry alerts
│   │   │   ├── Sidebar.jsx      # Navigation links with active route states
│   │   │   └── Footer.jsx       # System footer
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Live monitoring telemetry & quick links
│   │   │   ├── SimulationForm.jsx # Parameter configuration & presets
│   │   │   ├── Results.jsx      # Analytics, print report, and sharing
│   │   │   ├── History.jsx      # Historical run table with CSV export
│   │   │   ├── About.jsx        # Architecture, math formulation & algorithms
│   │   │   ├── Settings.jsx     # SQLite-backed user preferences
│   │   │   ├── HelpCenter.jsx   # FAQ and documentation search
│   │   │   ├── Docs.jsx         # Industry documentation links
│   │   │   ├── Community.jsx    # Community discussion links
│   │   │   └── Login.jsx        # Glassmorphic auth with Quick Demo mode
│   │   ├── services/
│   │   │   └── api.js           # Centralized Axios client
│   │   ├── config.js            # Environment API configuration
│   │   ├── MainApp.jsx          # Route definitions & auth wrapper
│   │   └── styles/
│   │       └── main.css         # Responsive glassmorphism styling
│   └── package.json
│
└── README.md
```

---

## ⚡ Quickstart Guide

### 1. Prerequisites
- **Python 3.10+** (Tested on Python 3.13)
- **Node.js 18+** & **npm**

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run automated tests to verify environment
python -m unittest discover -s tests

# Start the FastAPI server (runs on port 8000)
python app.py
```
> The API will be live at: `http://127.0.0.1:8000`  
> Interactive Swagger API Documentation: `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd qos_frontend

# Install node dependencies
npm install

# Start the React application
npm start
```
> The Dashboard will be live at: `http://localhost:3000`

---

## 🧪 Automated Testing

To run the complete test suite:
```bash
cd backend
python -m unittest discover -s tests
```
*Tests validate API status codes, Pydantic serialization, model inference bounds, database inserts, and algorithm edge cases.*

---

## 📊 Scheduling Algorithms Performance Summary

| Algorithm | Strategy | Time Complexity | Energy Saved (%) | QoS Satisfaction (%) | Latency Impact |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **QoS Aware Heuristic (IEERA)** | Dynamic priority ranking on deadline & energy | $O(N \log N)$ | **38.4% - 42.1%** | **92% - 96%** | Minimal (~42ms) |
| **Reinforcement Learning** | Q-Learning state-action reward policy | $O(1)$ inference | **34.2% - 37.8%** | **88% - 94%** | Low (~36ms) |
| **Energy Bin Packing** | First Fit Decreasing into active node bins | $O(N \log N)$ | **29.1% - 33.5%** | **80% - 85%** | Moderate (~52ms) |
| **Round Robin** | Cyclic assignment without resource awareness | $O(1)$ | **14.2% - 18.0%** | **74% - 80%** | High (~80ms) |
| **FCFS (Baseline)** | Strict arrival queue order | $O(1)$ | **4.0% - 8.2%** | **65% - 71%** | Severe (~100ms) |

---

## 👨‍💻 Author & Contact

- **Developer:** Kowsalya S
- **Repository:** [FogOptimizer on GitHub](https://github.com/Kowsalya-S-cse/FogOptimizer)
