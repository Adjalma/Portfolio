import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { WellMonitoring } from './components/WellMonitoring';
import { AlertPanel } from './components/AlertPanel';
import { DataAnalysis } from './components/DataAnalysis';

export const MonitoramentoPocosApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Monitoramento de Poços
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <WellMonitoring />
        </Grid>
        <Grid item xs={12} md={4}>
          <AlertPanel />
        </Grid>
        <Grid item xs={12}>
          <DataAnalysis />
        </Grid>
      </Grid>
    </Box>
  );
}; 