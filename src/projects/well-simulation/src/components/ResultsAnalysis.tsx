import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const simulationData = [
  { depth: 0, pressure: 1000, temperature: 25, flow: 100 },
  { depth: 500, pressure: 1500, temperature: 45, flow: 95 },
  { depth: 1000, pressure: 2000, temperature: 65, flow: 90 },
  { depth: 1500, pressure: 2500, temperature: 85, flow: 85 }
];

export const ResultsAnalysis = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Análise de Resultados
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={simulationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="depth" label={{ value: 'Profundidade (m)', position: 'bottom' }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pressure" stroke="#8884d8" name="Pressão (psi)" />
            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperatura (°C)" />
            <Line type="monotone" dataKey="flow" stroke="#ffc658" name="Vazão (%)" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 