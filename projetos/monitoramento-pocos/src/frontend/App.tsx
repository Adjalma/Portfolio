import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { WellStatus } from './components/WellStatus';
import { RealTimeChart } from './components/RealTimeChart';
import { AlertsPanel } from './components/AlertsPanel';
import { ParametersDashboard } from './components/ParametersDashboard';
import useWebSocket from 'react-use-websocket';

interface WellData {
  well_id: string;
  timestamp: string;
  pressure: number;
  temperature: number;
  flow_rate: number;
  status: string;
}

interface Alert {
  well_id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export const App: React.FC = () => {
  const [wellData, setWellData] = useState<WellData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedWell, setSelectedWell] = useState<string>('WELL-001');

  const { lastJsonMessage } = useWebSocket(
    `ws://localhost:8000/ws/wells/${selectedWell}`,
    {
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'alert') {
          setAlerts(prev => [...prev, data.data]);
        } else {
          setWellData(prev => [...prev.slice(-50), data]);
        }
      }
    }
  );

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">
          Monitoramento de Poços
        </Typography>
      </Grid>

      <Grid item xs={12} md={8} component="section">
        <RealTimeChart data={wellData} />
      </Grid>

      <Grid item xs={12} md={4} component="section">
        <WellStatus data={wellData[wellData.length - 1]} />
        <AlertsPanel alerts={alerts} />
      </Grid>

      <Grid item xs={12} component="section">
        <ParametersDashboard data={wellData} />
      </Grid>
    </Grid>
  );
}; 