import React from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';

interface WeatherPoint {
  lat: number;
  lon: number;
  wind_speed: number;
  wave_height: number;
  visibility: number;
  condition: string;
}

interface Props {
  data: WeatherPoint;
}

export const WeatherInfo: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">Condições Climáticas</Typography>
        <Grid container spacing={2} component="div">
          <Grid item xs={6} component="div">
            <Typography>Vento: {data.wind_speed} nós</Typography>
          </Grid>
          <Grid item xs={6} component="div">
            <Typography>Ondas: {data.wave_height}m</Typography>
          </Grid>
          <Grid item xs={12} component="div">
            <Typography>Visibilidade: {data.visibility}km</Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}; 