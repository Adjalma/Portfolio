import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { EquipmentList } from './components/EquipmentList';
import { MaintenanceSchedule } from './components/MaintenanceSchedule';
import { RiskAnalysis } from './components/RiskAnalysis';
import { RecommendationPanel } from './components/RecommendationPanel';
import { api } from './services/api';

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'critical';
}

interface MaintenancePrediction {
  equipment_id: string;
  risk_score: number;
  next_maintenance: {
    hours_remaining: number;
    estimated_date: string;
  };
  recommendations: Array<{
    priority: string;
    action: string;
    details: string;
  }>;
}

export const App: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<MaintenancePrediction | null>(null);

  useEffect(() => {
    loadEquipments();
  }, []);

  useEffect(() => {
    if (selectedEquipment) {
      loadPrediction(selectedEquipment);
    }
  }, [selectedEquipment]);

  const loadEquipments = async () => {
    try {
      const response = await api.get('/equipments');
      setEquipments(response.data);
    } catch (error) {
      console.error('Error loading equipments:', error);
    }
  };

  const loadPrediction = async (equipmentId: string) => {
    try {
      const response = await api.get(`/predict/maintenance/${equipmentId}`);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error loading prediction:', error);
    }
  };

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">
          Sistema de Manutenção Preventiva
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <EquipmentList
          equipments={equipments}
          selectedId={selectedEquipment}
          onSelect={setSelectedEquipment}
        />
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <RiskAnalysis prediction={prediction} />
      </Grid>

      <Grid item xs={12} component="section">
        <MaintenanceSchedule
          equipments={equipments}
          predictions={prediction ? [prediction] : []}
        />
      </Grid>

      <Grid item xs={12} component="section">
        <RecommendationPanel recommendations={prediction?.recommendations || []} />
      </Grid>
    </Grid>
  );
}; 