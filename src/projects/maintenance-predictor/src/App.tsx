import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { PredictionDashboard } from './components/PredictionDashboard';
import { EquipmentHealth } from './components/EquipmentHealth';
import { MaintenanceRecommendations } from './components/MaintenanceRecommendations';

export const MaintenancePredictorApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Preditor de Manutenção
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <PredictionDashboard />
        </Grid>
        <Grid item xs={12} md={6}>
          <EquipmentHealth />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaintenanceRecommendations />
        </Grid>
      </Grid>
    </Box>
  );
}; 