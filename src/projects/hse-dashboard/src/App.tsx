import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { SafetyMetrics } from './components/SafetyMetrics';
import { IncidentReports } from './components/IncidentReports';
import { ComplianceStatus } from './components/ComplianceStatus';

export const HSEDashboardApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard HSE
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SafetyMetrics />
        </Grid>
        <Grid item xs={12} md={6}>
          <IncidentReports />
        </Grid>
        <Grid item xs={12} md={6}>
          <ComplianceStatus />
        </Grid>
      </Grid>
    </Box>
  );
}; 