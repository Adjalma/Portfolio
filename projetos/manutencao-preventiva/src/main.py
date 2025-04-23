from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
from datetime import datetime, timedelta

app = FastAPI(title="Sistema de Recomendação para Manutenção")

# Carregar modelos treinados
maintenance_model = joblib.load('models/maintenance_model.pkl')
scaler = joblib.load('models/scaler.pkl')

class EquipmentData(BaseModel):
    equipment_id: str
    sensor_data: dict  # {sensor_name: value}
    operational_hours: int
    last_maintenance: str
    manufacturer: str

@app.post("/predict/maintenance")
async def predict_maintenance(data: EquipmentData):
    try:
        # Preparar features
        features = prepare_features(data)
        
        # Fazer predição
        risk_score = maintenance_model.predict_proba(features)[0][1]
        
        # Calcular próxima manutenção recomendada
        next_maintenance = calculate_next_maintenance(
            risk_score,
            data.operational_hours,
            data.last_maintenance
        )
        
        return {
            "equipment_id": data.equipment_id,
            "risk_score": float(risk_score),
            "next_maintenance": next_maintenance,
            "recommendations": generate_recommendations(risk_score, data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def prepare_features(data):
    features = []
    for sensor, value in data.sensor_data.items():
        features.append(value)
    
    features.append(data.operational_hours)
    features.append(
        (datetime.now() - datetime.fromisoformat(data.last_maintenance)).days
    )
    
    return scaler.transform([features])

def calculate_next_maintenance(risk_score: float, hours: int, last_maintenance: str):
    base_interval = 2000  # Horas base entre manutenções
    risk_factor = 1 - risk_score
    
    recommended_hours = base_interval * risk_factor
    current_hours = hours
    
    return {
        "hours_remaining": int(recommended_hours - current_hours),
        "estimated_date": (datetime.now() + timedelta(
            hours=recommended_hours - current_hours
        )).isoformat()
    }

def generate_recommendations(risk_score: float, data: EquipmentData):
    recommendations = []
    
    if risk_score > 0.7:
        recommendations.append({
            "priority": "high",
            "action": "Agendar manutenção imediatamente",
            "details": "Alto risco de falha detectado"
        })
    elif risk_score > 0.4:
        recommendations.append({
            "priority": "medium",
            "action": "Monitorar de perto",
            "details": "Risco moderado identificado"
        })
    
    return recommendations 