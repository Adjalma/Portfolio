import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_websocket_connection():
    with client.websocket_connect("/ws") as websocket:
        data = websocket.receive_json()
        assert "well_id" in data
        assert "timestamp" in data
        assert "parameters" in data

def test_alert_generation():
    alert_data = {
        "well_id": "WELL-001",
        "parameter": "pressure",
        "value": 150.5,
        "threshold": 145.0,
        "timestamp": "2024-03-20T14:30:00"
    }
    response = client.post("/alerts", json=alert_data)
    assert response.status_code == 200
    data = response.json()
    assert "alert_id" in data 