import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { OilQualityDashboard } from './components/OilQualityDashboard';
import { TrendAnalysis } from './components/TrendAnalysis';
import { ReportGenerator } from './components/ReportGenerator';

export const OilAnalysisApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Análise de Óleo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OilQualityDashboard />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendAnalysis />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportGenerator />
        </Grid>
      </Grid>
    </Box>
  );
}; 