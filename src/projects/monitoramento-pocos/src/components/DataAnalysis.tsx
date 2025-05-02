import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const analysisData = [
  { month: 'Jan', efficiency: 85, downtime: 15 },
  { month: 'Fev', efficiency: 88, downtime: 12 },
  { month: 'Mar', efficiency: 90, downtime: 10 },
  // ... mais dados
];

export const DataAnalysis = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Análise de Desempenho
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BarChart width={800} height={300} data={analysisData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="efficiency" fill="#8884d8" />
            <Bar dataKey="downtime" fill="#82ca9d" />
          </BarChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 