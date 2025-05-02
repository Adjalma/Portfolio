import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { SimulationControls } from './components/SimulationControls';
import { WellVisualization } from './components/WellVisualization';
import { ResultsAnalysis } from './components/ResultsAnalysis';

export const WellSimulationApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Simulador de Poços
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SimulationControls />
        </Grid>
        <Grid item xs={12} md={8}>
          <WellVisualization />
        </Grid>
        <Grid item xs={12}>
          <ResultsAnalysis />
        </Grid>
      </Grid>
    </Box>
  );
}; 