import React from 'react';
import { Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const safetyData = [
  { month: 'Jan', incidents: 2, nearMisses: 5, daysWithoutAccidents: 30 },
  { month: 'Fev', incidents: 1, nearMisses: 3, daysWithoutAccidents: 60 },
  { month: 'Mar', incidents: 0, nearMisses: 4, daysWithoutAccidents: 90 }
];

export const SafetyMetrics = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Métricas de Segurança
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={safetyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="incidents" stroke="#ff4444" name="Incidentes" />
            <Line type="monotone" dataKey="nearMisses" stroke="#ffbb33" name="Quase Acidentes" />
            <Line type="monotone" dataKey="daysWithoutAccidents" stroke="#00C851" name="Dias sem Acidentes" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 