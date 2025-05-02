import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { month: 'Jan', emissoes: 120, residuos: 45, consumoAgua: 1000 },
  { month: 'Fev', emissoes: 115, residuos: 48, consumoAgua: 950 },
  { month: 'Mar', emissoes: 130, residuos: 42, consumoAgua: 1100 }
];

export const EnvironmentalData = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dados Ambientais
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="emissoes" stroke="#8884d8" />
            <Line type="monotone" dataKey="residuos" stroke="#82ca9d" />
            <Line type="monotone" dataKey="consumoAgua" stroke="#ffc658" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 