import React from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { WeatherCondition } from '../types';

interface Props {
  data: WeatherCondition | null;
}

export const WeatherInfo: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6">Condições Climáticas</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Vento: {data.wind_speed} nós</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Ondas: {data.wave_height}m</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Visibilidade: {data.visibility}km</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}; 