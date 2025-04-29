import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ProductionDashboard } from './components/ProductionDashboard';
import { OptimizationSuggestions } from './components/OptimizationSuggestions';
import { MLPredictions } from './components/MLPredictions';

export const ProductionOptimizationApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Otimização de Produção
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProductionDashboard />
        </Grid>
        <Grid item xs={12} md={6}>
          <OptimizationSuggestions />
        </Grid>
        <Grid item xs={12} md={6}>
          <MLPredictions />
        </Grid>
      </Grid>
    </Box>
  );
}; 