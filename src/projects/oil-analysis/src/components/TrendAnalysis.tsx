import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const trendData = [
  { month: 'Jan', quality: 92, contamination: 8 },
  { month: 'Fev', quality: 94, contamination: 6 },
  { month: 'Mar', quality: 91, contamination: 9 },
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
            <Bar dataKey="quality" fill="#8884d8" />
            <Bar dataKey="contamination" fill="#82ca9d" />
          </BarChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 