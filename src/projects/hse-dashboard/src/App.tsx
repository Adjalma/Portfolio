import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { SafetyMetrics } from './components/SafetyMetrics';
import { IncidentReport } from './components/IncidentReport';
import { EnvironmentalData } from './components/EnvironmentalData';

export const HSEDashboardApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard HSE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SafetyMetrics />
        </Grid>
        <Grid item xs={12} md={4}>
          <IncidentReport />
        </Grid>
        <Grid item xs={12} md={4}>
          <EnvironmentalData />
        </Grid>
      </Grid>
    </Box>
  );
}; 