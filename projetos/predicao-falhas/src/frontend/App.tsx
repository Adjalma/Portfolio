import React, { useState, useEffect } from 'react';
import { Grid, Card } from '@mui/material';
import { EquipmentStatus } from './components/EquipmentStatus';
import { PredictionChart } from './components/PredictionChart';
import { AlertsPanel } from './components/AlertsPanel';
import { api } from './services/api';
import { SensorData, Prediction, Alert } from './types';

export const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Simular leitura de sensores
    const interval = setInterval(async () => {
      const data = generateSensorData();
      setSensorData(prev => [...prev.slice(-50), data]);
      
      try {
        const response = await api.post('/predict/failures', data);
        setPredictions(prev => [...prev.slice(-50), response.data]);
        
        if (response.data.is_anomaly) {
          setAlerts(prev => [...prev, {
            type: 'warning',
            message: 'Anomalia detectada',
            timestamp: new Date().toISOString()
          }]);
        }
      } catch (error) {
        console.error('Error predicting failures:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateSensorData = (): SensorData => ({
    equipment_id: 'EQ-001',
    timestamp: new Date().toISOString(),
    temperature: 50 + Math.random() * 20,
    pressure: 90 + Math.random() * 20,
    vibration: 40 + Math.random() * 20,
    noise_level: 75 + Math.random() * 20,
    power_consumption: 800 + Math.random() * 400,
    operational_hours: 2500
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <PredictionChart data={predictions} />
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <EquipmentStatus data={sensorData[sensorData.length - 1]} />
        <AlertsPanel alerts={alerts} />
      </Grid>
    </Grid>
  );
}; 