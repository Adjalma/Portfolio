import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface Props {
  onSubmit: (params: any) => void;
}

export const RouteForm: React.FC<Props> = ({ onSubmit }) => {
  const [origin, setOrigin] = useState({ lat: '', lon: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(origin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Origem (Lat)"
            value={origin.lat}
            onChange={(e) => setOrigin({ ...origin, lat: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Origem (Lon)"
            value={origin.lon}
            onChange={(e) => setOrigin({ ...origin, lon: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Otimizar Rota
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}; 