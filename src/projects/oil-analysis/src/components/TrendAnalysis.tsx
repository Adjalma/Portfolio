import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const trendData = [
  { month: 'Jan', quality: 90, degradation: 10 },
  { month: 'Fev', quality: 85, degradation: 15 },
  { month: 'Mar', quality: 82, degradation: 18 }
];

export const TrendAnalysis = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Análise de Tendências
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BarChart width={500} height={300} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quality" fill="#8884d8" name="Qualidade" />
            <Bar dataKey="degradation" fill="#82ca9d" name="Degradação" />
          </BarChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 