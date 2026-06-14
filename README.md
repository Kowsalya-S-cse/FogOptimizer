# EcoFog AI  
### Intelligent Energy-Aware Fog Resource Allocation and QoS Optimization for IoT Applications

---

# 📌 Project Overview

EcoFog AI is an intelligent Fog–Cloud computing framework designed to optimize resource allocation for IoT applications while reducing energy consumption and maintaining Quality of Service (QoS).

The system dynamically distributes IoT workloads between fog nodes and cloud servers based on workload intensity, task priority, and resource availability.

EcoFog AI integrates:
- Fog Computing
- Machine Learning
- Intelligent Scheduling
- Energy-Aware Resource Allocation
- Real-Time Monitoring Dashboard

---

# 🚀 Key Features

✅ Intelligent Fog–Cloud Architecture  
✅ Dynamic Resource Allocation  
✅ QoS-Aware Scheduling  
✅ Energy-Efficient Task Offloading  
✅ Workload Prediction using LSTM & GRU  
✅ Priority-Based Scheduling  
✅ Reinforcement Learning-Based Scheduling  
✅ Real-Time Monitoring Dashboard  
✅ Latency & Throughput Analysis  
✅ Resource Utilization Monitoring  
✅ AI-Based Scheduling Optimization  

---

# 🏗️ System Architecture

The system consists of:

- IoT Layer
- Fog Layer
- Cloud Layer
- AI Prediction Engine
- Scheduling Engine
- Monitoring Dashboard

---

# 🧠 Technologies Used

## Frontend
- ReactJS
- Axios
- React Router DOM
- Recharts
- CSS

## Backend
- Python
- Flask
- REST APIs

## Machine Learning
- TensorFlow
- Keras
- Scikit-learn
- LSTM
- GRU
- Reinforcement Learning

## Database
- SQLite

---

# 📂 Project Structure

```bash
ccp_4thsem/
│
├── backend/
│   ├── ml/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── utils/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── settings.db
│   └── fog_scheduling_dataset_custom_algo.csv
│
├── qos_frontend/
│   ├── build/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── charts/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── config.js
│   │   ├── index.js
│   │   └── MainApp.jsx
│   │
│   ├── package.json
│   └── README.md
│
├── venv/
└── README.md
⚙️ Scheduling Algorithms
FCFS (First Come First Serve)
Round Robin
Priority Scheduling
Bin Packing
Energy-Aware Scheduling
Reinforcement Learning-Based Scheduling
📊 Performance Metrics

The system evaluates:

Latency
Throughput
Energy Consumption
Resource Utilization
QoS Satisfaction
Waiting Time
Task Completion Time
🔄 Workflow
IoT workloads are generated
Data preprocessing is performed
Workload prediction using LSTM/GRU
Priority scores are calculated
Scheduling algorithms allocate resources
Tasks execute on fog/cloud nodes
Dashboard visualizes metrics and results
🖥️ Frontend Setup
Navigate to frontend
cd qos_frontend
Install dependencies
npm install
Run frontend
npm start

Frontend runs on:

http://localhost:3000
⚙️ Backend Setup
Navigate to backend
cd backend
Create virtual environment
python -m venv venv
Activate virtual environment
Windows
venv\Scripts\activate
Linux/Mac
source venv/bin/activate
Install dependencies
pip install -r requirements.txt
Run Flask server
python app.py

Backend runs on:

http://localhost:5000
📈 Dashboard Features
Fog Node Monitoring
Energy Consumption Graphs
Latency Analysis
Throughput Visualization
QoS Monitoring
Task Scheduling Results
Resource Utilization Tracking
AI Prediction Results
📉 Expected Outcomes

✅ Reduced latency
✅ Improved QoS
✅ Lower energy consumption
✅ Better workload balancing
✅ Efficient task scheduling
✅ Improved resource utilization
✅ Enhanced fog node performance

🔮 Future Enhancements
Deep Reinforcement Learning Optimization
Real-Time Edge Deployment
Kubernetes-Based Fog Orchestration
Blockchain-Based Security
Smart City Scale Integration
Advanced AI-Based Resource Prediction
