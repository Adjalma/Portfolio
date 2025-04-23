from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import json

app = FastAPI(title="HSE Dashboard")

class SafetyMetric(BaseModel):
    location: str
    incident_type: str
    severity: int
    timestamp: str
    details: dict

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            # Receber dados dos sensores
            data = await websocket.receive_text()
            metrics = process_safety_metrics(json.loads(data))
            
            # Detectar anomalias
            alerts = detect_safety_anomalies(metrics)
            
            # Enviar resultados
            await websocket.send_json({
                "metrics": metrics,
                "alerts": alerts,
                "recommendations": generate_recommendations(alerts)
            })
        except Exception as e:
            print(f"Error: {e}")
            break

def process_safety_metrics(data):
    # Processar métricas de segurança
    df = pd.DataFrame(data)
    return {
        "incident_rate": calculate_incident_rate(df),
        "risk_level": assess_risk_level(df),
        "compliance_score": calculate_compliance(df)
    }

def detect_safety_anomalies(metrics):
    # Detectar anomalias usando Isolation Forest
    model = IsolationForest(contamination=0.1)
    anomalies = model.fit_predict(metrics)
    return anomalies.tolist() 