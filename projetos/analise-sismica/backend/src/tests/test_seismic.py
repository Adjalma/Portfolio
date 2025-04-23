import pytest
import numpy as np
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_analyze_seismic_data():
    # Gerar dados sísmicos sintéticos para teste
    t = np.linspace(0, 10, 1000)
    data = np.sin(2*np.pi*2*t) + 0.5*np.sin(2*np.pi*10*t)
    
    seismic_data = {
        "location": {"lat": -23.5505, "lon": -46.6333},
        "timestamp": "2024-03-20T14:30:00",
        "depth": 1000,
        "data": data.tolist(),
        "sampling_rate": 100
    }
    
    response = client.post("/analyze/seismic", json=seismic_data)
    assert response.status_code == 200
    result = response.json()
    
    assert "events" in result
    assert "anomalies" in result
    assert isinstance(result["events"], list) 