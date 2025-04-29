import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { EquipmentStatus } from './components/EquipmentStatus';
import { MaintenanceSchedule } from './components/MaintenanceSchedule';
import { PerformanceMetrics } from './components/PerformanceMetrics';

export const EquipmentMonitoringApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monitoramento de Equipamentos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <EquipmentStatus />
        </Grid>
        <Grid item xs={12} md={4}>
          <MaintenanceSchedule />
        </Grid>
        <Grid item xs={12}>
          <PerformanceMetrics />
        </Grid>
      </Grid>
    </Box>
  );
}; 