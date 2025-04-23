import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_get_equipment_status():
    response = client.get("/equipment/status/1")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "last_maintenance" in data

def test_predict_failure():
    equipment_data = {
        "id": "1",
        "temperature": 85.5,
        "vibration": 2.3,
        "pressure": 100.2,
        "hours_since_maintenance": 720
    }
    response = client.post("/predict/failure", json=equipment_data)
    assert response.status_code == 200
    data = response.json()
    assert "probability" in data
    assert "recommended_action" in data

def test_schedule_maintenance():
    schedule_data = {
        "equipment_id": "1",
        "maintenance_type": "preventive",
        "scheduled_date": "2024-04-01T10:00:00"
    }
    response = client.post("/schedule/maintenance", json=schedule_data)
    assert response.status_code == 200
    data = response.json()
    assert "scheduled" in data
    assert data["scheduled"] == True