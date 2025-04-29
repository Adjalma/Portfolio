import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

export const WellVisualization = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Visualização do Poço
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ 
            height: '500px', 
            background: '#f5f5f5', 
            border: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography variant="body1" color="textSecondary">
              Visualização 3D do Poço
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}; 