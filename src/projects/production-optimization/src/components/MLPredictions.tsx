import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const predictionData = [
  { well: 'A-123', current: 1000, predicted: 1200, confidence: 0.85 },
  { well: 'B-456', current: 800, predicted: 750, confidence: 0.92 },
  { well: 'C-789', current: 1200, predicted: 1300, confidence: 0.88 }
];

export const MLPredictions = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Previsões de Machine Learning
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BarChart width={600} height={300} data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="well" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#8884d8" name="Produção Atual" />
            <Bar dataKey="predicted" fill="#82ca9d" name="Produção Prevista" />
          </BarChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 