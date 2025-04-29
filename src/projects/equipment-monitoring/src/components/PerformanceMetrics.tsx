import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const performanceData = [
  { time: '08:00', efficiency: 95, temperature: 65, vibration: 2.5 },
  { time: '09:00', efficiency: 93, temperature: 68, vibration: 2.8 },
  { time: '10:00', efficiency: 94, temperature: 67, vibration: 2.6 },
  { time: '11:00', efficiency: 92, temperature: 70, vibration: 3.0 }
];

export const PerformanceMetrics = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Métricas de Desempenho
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="efficiency" stroke="#8884d8" name="Eficiência (%)" />
            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperatura (°C)" />
            <Line type="monotone" dataKey="vibration" stroke="#ffc658" name="Vibração (mm/s)" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 