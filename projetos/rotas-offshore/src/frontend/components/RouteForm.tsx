import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface Props {
  onSubmit: (data: any) => void;
}

export const RouteForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    origin: { lat: '', lon: '' },
    destination: { lat: '', lon: '' },
    vesselType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Origem (Lat)"
            value={formData.origin.lat}
            onChange={e => setFormData({
              ...formData,
              origin: { ...formData.origin, lat: e.target.value }
            })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Origem (Lon)"
            value={formData.origin.lon}
            onChange={e => setFormData({
              ...formData,
              origin: { ...formData.origin, lon: e.target.value }
            })}
            fullWidth
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