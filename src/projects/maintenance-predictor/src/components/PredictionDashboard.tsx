import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const predictionData = [
  { time: 'Jan', reliability: 95, risk: 5, maintenance: 2 },
  { time: 'Fev', reliability: 92, risk: 8, maintenance: 3 },
  { time: 'Mar', reliability: 88, risk: 12, maintenance: 4 },
  { time: 'Abr', reliability: 85, risk: 15, maintenance: 5 }
];

export const PredictionDashboard = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard de Predições
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="reliability" stroke="#8884d8" name="Confiabilidade (%)" />
            <Line type="monotone" dataKey="risk" stroke="#82ca9d" name="Risco (%)" />
            <Line type="monotone" dataKey="maintenance" stroke="#ffc658" name="Manutenções Previstas" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 