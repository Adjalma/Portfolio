from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib

app = FastAPI(title="Gestão de Resíduos e Efluentes")

# Carregar modelos
anomaly_detector = joblib.load('models/anomaly_detector.pkl')
treatment_optimizer = joblib.load('models/treatment_optimizer.pkl')

class WasteData(BaseModel):
    facility_id: str
    timestamp: str
    waste_type: str  # solid, liquid, gas
    parameters: dict  # {parameter: value}
    volume: float
    treatment_method: str

@app.post("/analyze/waste")
async def analyze_waste(data: WasteData):
    try:
        # Detectar anomalias nos parâmetros
        anomalies = detect_anomalies(data.parameters)
        
        # Otimizar tratamento
        treatment = optimize_treatment(
            data.waste_type,
            data.parameters,
            data.volume
        )
        
        # Gerar recomendações
        recommendations = generate_recommendations(
            anomalies,
            treatment,
            data
        )
        
        return {
            "facility_id": data.facility_id,
            "timestamp": data.timestamp,
            "analysis": {
                "anomalies": anomalies,
                "compliance_status": check_compliance(data.parameters),
                "risk_level": calculate_risk(anomalies, data.volume)
            },
            "treatment": treatment,
            "recommendations": recommendations,
            "next_inspection": schedule_next_inspection(data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def detect_anomalies(parameters: dict) -> list[dict]:
    # Detectar valores anormais nos parâmetros
    features = np.array(list(parameters.values())).reshape(1, -1)
    is_anomaly = anomaly_detector.predict(features)[0]
    
    anomalies = []
    if is_anomaly == -1:  # Anomalia detectada
        for param, value in parameters.items():
            if abs(value) > 2:  # Simplificado - usar limites reais
                anomalies.append({
                    "parameter": param,
                    "value": value,
                    "severity": "high" if abs(value) > 5 else "medium"
                })
    
    return anomalies

def optimize_treatment(
    waste_type: str,
    parameters: dict,
    volume: float
) -> dict:
    # Otimizar método de tratamento
    features = np.array([
        *list(parameters.values()),
        volume
    ]).reshape(1, -1)
    
    treatment_params = treatment_optimizer.predict(features)[0]
    
    return {
        "method": get_treatment_method(waste_type, parameters),
        "parameters": {
            "temperature": float(treatment_params[0]),
            "duration": float(treatment_params[1]),
            "chemical_dosage": float(treatment_params[2])
        },
        "estimated_efficiency": float(treatment_params[3])
    }

def generate_recommendations(
    anomalies: list[dict],
    treatment: dict,
    data: WasteData
) -> list[dict]:
    recommendations = []
    
    # Recomendações baseadas em anomalias
    for anomaly in anomalies:
        recommendations.append({
            "type": "correction",
            "priority": anomaly["severity"],
            "action": f"Corrigir {anomaly['parameter']}",
            "details": f"Valor atual: {anomaly['value']}"
        })
    
    # Recomendações de otimização
    if treatment["estimated_efficiency"] < 0.8:
        recommendations.append({
            "type": "optimization",
            "priority": "medium",
            "action": "Otimizar tratamento",
            "details": "Eficiência abaixo do ideal"
        })
    
    return recommendations

def check_compliance(parameters: dict) -> dict:
    # Verificar conformidade com regulamentações
    compliance = {"status": "compliant", "violations": []}
    
    # Simplificado - usar limites reais da legislação
    limits = {
        "ph": (6.0, 9.0),
        "bod": (0, 60),
        "cod": (0, 150),
        "tss": (0, 100)
    }
    
    for param, value in parameters.items():
        if param in limits:
            min_val, max_val = limits[param]
            if value < min_val or value > max_val:
                compliance["status"] = "non_compliant"
                compliance["violations"].append({
                    "parameter": param,
                    "value": value,
                    "limit": f"{min_val}-{max_val}"
                })
    
    return compliance

def calculate_risk(anomalies: list[dict], volume: float) -> str:
    # Calcular nível de risco
    if len(anomalies) > 2:
        return "high"
    elif len(anomalies) > 0 or volume > 1000:
        return "medium"
    return "low"

def get_treatment_method(waste_type: str, parameters: dict) -> str:
    # Determinar método de tratamento apropriado
    methods = {
        "solid": ["incineration", "landfill", "composting"],
        "liquid": ["biological", "chemical", "physical"],
        "gas": ["absorption", "adsorption", "thermal"]
    }
    
    # Simplificado - implementar lógica real de seleção
    return methods[waste_type][0]

def schedule_next_inspection(data: WasteData) -> str:
    # Agendar próxima inspeção baseado no risco
    base_interval = timedelta(days=30)
    risk_multiplier = {
        "high": 0.5,    # 15 dias
        "medium": 1.0,  # 30 dias
        "low": 2.0      # 60 dias
    }
    
    risk = calculate_risk([], data.volume)  # Simplificado
    next_date = datetime.fromisoformat(data.timestamp) + (base_interval * risk_multiplier[risk])
    
    return next_date.isoformat() 