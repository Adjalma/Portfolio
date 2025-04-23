from fastapi import FastAPI, WebSocket
from pydantic import BaseModel
import asyncio
import json
import numpy as np
from datetime import datetime
import pandas as pd

app = FastAPI(title="Monitoramento de Poços em Tempo Real")

class WellData(BaseModel):
    well_id: str
    timestamp: str
    pressure: float
    temperature: float
    flow_rate: float
    status: str

# Armazenar conexões WebSocket ativas
active_connections: list[WebSocket] = []

@app.websocket("/ws/wells/{well_id}")
async def websocket_endpoint(websocket: WebSocket, well_id: str):
    await websocket.accept()
    active_connections.append(websocket)
    
    try:
        while True:
            # Simular dados do poço em tempo real
            data = generate_well_data(well_id)
            await websocket.send_json(data)
            await asyncio.sleep(1)  # Atualizar a cada segundo
    except:
        active_connections.remove(websocket)

def generate_well_data(well_id: str) -> dict:
    return {
        "well_id": well_id,
        "timestamp": datetime.now().isoformat(),
        "pressure": np.random.normal(1000, 50),  # PSI
        "temperature": np.random.normal(80, 5),   # °C
        "flow_rate": np.random.normal(500, 20),   # bbl/day
        "status": "operational"
    }

@app.get("/wells/{well_id}/history")
async def get_well_history(well_id: str):
    try:
        # Buscar histórico do poço
        df = pd.read_csv(f'data/wells/{well_id}/history.csv')
        return df.to_dict('records')
    except Exception as e:
        raise HTTPException(status_code=404, detail="Well not found")

@app.post("/wells/{well_id}/alerts")
async def create_alert(well_id: str, data: dict):
    # Processar e armazenar alertas
    alert = {
        "well_id": well_id,
        "type": data["type"],
        "message": data["message"],
        "timestamp": datetime.now().isoformat(),
        "severity": data["severity"]
    }
    
    # Notificar todos os clientes conectados
    for connection in active_connections:
        await connection.send_json({
            "type": "alert",
            "data": alert
        })
    
    return alert 