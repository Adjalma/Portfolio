from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import joblib
from typing import List

app = FastAPI(title="Predição de Falhas em Equipamentos")

# Carregar modelos treinados
failure_predictor = joblib.load('models/failure_predictor.pkl')
anomaly_detector = joblib.load('models/anomaly_detector.pkl')

class SensorData(BaseModel):
    equipment_id: str
    timestamp: str
    temperature: float
    pressure: float
    vibration: float
    noise_level: float
    power_consumption: float
    operational_hours: int

@app.post("/predict/failures")
async def predict_failures(data: SensorData):
    try:
        # Preparar dados para predição
        features = np.array([
            data.temperature,
            data.pressure,
            data.vibration,
            data.noise_level,
            data.power_consumption,
            data.operational_hours
        ]).reshape(1, -1)
        
        # Detectar anomalias
        is_anomaly = anomaly_detector.predict(features)[0] == -1
        
        # Predizer probabilidade de falha
        failure_prob = float(failure_predictor.predict_proba(features)[0][1])
        
        # Calcular tempo estimado até falha
        hours_to_failure = estimate_time_to_failure(
            failure_prob,
            data.operational_hours
        )
        
        # Gerar recomendações
        recommendations = generate_recommendations(
            failure_prob,
            is_anomaly,
            data
        )
        
        return {
            "equipment_id": data.equipment_id,
            "timestamp": data.timestamp,
            "failure_probability": failure_prob,
            "is_anomaly": is_anomaly,
            "estimated_hours_to_failure": hours_to_failure,
            "risk_level": calculate_risk_level(failure_prob),
            "recommendations": recommendations,
            "next_maintenance": schedule_maintenance(
                data.timestamp,
                hours_to_failure
            )
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def estimate_time_to_failure(probability: float, hours: int) -> float:
    # Estimar tempo até falha baseado na probabilidade
    if probability < 0.3:
        return float('inf')
    
    # Quanto maior a probabilidade, menor o tempo até falha
    base_hours = 1000 * (1 - probability)
    
    # Ajustar baseado nas horas de operação
    if hours > 5000:
        base_hours *= 0.8
    elif hours > 2500:
        base_hours *= 0.9
    
    return max(24, base_hours)  # Mínimo de 24 horas

def calculate_risk_level(probability: float) -> str:
    if probability > 0.7:
        return "critical"
    elif probability > 0.4:
        return "high"
    elif probability > 0.2:
        return "medium"
    return "low"

def generate_recommendations(
    probability: float,
    is_anomaly: bool,
    data: SensorData
) -> List[dict]:
    recommendations = []
    
    if is_anomaly:
        # Identificar parâmetros anormais
        thresholds = {
            "temperature": (60, "alta temperatura"),
            "pressure": (100, "pressão elevada"),
            "vibration": (50, "vibração excessiva"),
            "noise_level": (85, "ruído elevado"),
            "power_consumption": (1000, "consumo elevado")
        }
        
        for param, (limit, desc) in thresholds.items():
            value = getattr(data, param)
            if value > limit:
                recommendations.append({
                    "type": "inspection",
                    "priority": "high",
                    "description": f"Inspecionar {desc}",
                    "parameter": param,
                    "current_value": value,
                    "threshold": limit
                })
    
    if probability > 0.4:
        recommendations.append({
            "type": "maintenance",
            "priority": "high" if probability > 0.7 else "medium",
            "description": "Agendar manutenção preventiva",
            "failure_probability": probability
        })
    
    if data.operational_hours > 5000:
        recommendations.append({
            "type": "replacement",
            "priority": "medium",
            "description": "Considerar substituição de componentes",
            "operational_hours": data.operational_hours
        })
    
    return recommendations

def schedule_maintenance(timestamp: str, hours_to_failure: float) -> str:
    current_time = datetime.fromisoformat(timestamp)
    
    if hours_to_failure == float('inf'):
        # Manutenção regular em 30 dias
        next_date = current_time + timedelta(days=30)
    else:
        # Agendar antes da falha prevista
        maintenance_hours = min(hours_to_failure * 0.8, 720)  # Max 30 dias
        next_date = current_time + timedelta(hours=maintenance_hours)
    
    return next_date.isoformat() 