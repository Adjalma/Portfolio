import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { SafetyMetricsChart } from './components/SafetyMetricsChart';
import { AlertsPanel } from './components/AlertsPanel';
import { ComplianceReport } from './components/ComplianceReport';
import { RealTimeMonitor } from './components/RealTimeMonitor';

export const App: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data.metrics);
      setAlerts(data.alerts);
    };

    return () => ws.close();
  }, []);

  return (
    <Grid container spacing={3} component="main">
      <Grid item xs={12} component="header">
        <Typography variant="h4">HSE Dashboard</Typography>
      </Grid>
      
      <Grid item xs={12} md={8} component="section">
        <Card>
          <SafetyMetricsChart data={metrics} />
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4} component="section">
        <AlertsPanel alerts={alerts} />
      </Grid>
      
      <Grid item xs={12} component="section">
        <ComplianceReport data={metrics?.compliance_score} />
      </Grid>
      
      <Grid item xs={12} component="section">
        <RealTimeMonitor />
      </Grid>
    </Grid>
  );
}; 