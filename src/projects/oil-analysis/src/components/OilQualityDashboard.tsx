import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const oilData = [
  { time: '08:00', viscosity: 85, acidity: 2.5, contamination: 0.5 },
  { time: '10:00', viscosity: 82, acidity: 2.7, contamination: 0.6 },
  { time: '12:00', viscosity: 84, acidity: 2.6, contamination: 0.4 }
];

export const OilQualityDashboard = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Qualidade do Óleo
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart width={800} height={400} data={oilData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="viscosity" stroke="#8884d8" name="Viscosidade" />
            <Line type="monotone" dataKey="acidity" stroke="#82ca9d" name="Acidez" />
            <Line type="monotone" dataKey="contamination" stroke="#ffc658" name="Contaminação" />
          </LineChart>
        </Grid>
      </Grid>
    </Paper>
  );
}; 