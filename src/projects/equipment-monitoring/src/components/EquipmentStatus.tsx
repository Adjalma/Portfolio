import React from 'react';
import { Paper, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { Check, Warning, Error } from '@mui/icons-material';

const equipments = [
  { id: 'PUMP-001', name: 'Bomba Centrífuga', status: 'operational', lastCheck: '2024-03-20' },
  { id: 'VALVE-002', name: 'Válvula de Controle', status: 'warning', lastCheck: '2024-03-19' },
  { id: 'MOTOR-003', name: 'Motor Elétrico', status: 'critical', lastCheck: '2024-03-18' }
];

export const EquipmentStatus = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Status dos Equipamentos
      </Typography>
      <Grid container spacing={2}>
        {equipments.map((equipment) => (
          <Grid item xs={12} md={4} key={equipment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{equipment.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  ID: {equipment.id}
                </Typography>
                <Chip
                  icon={
                    equipment.status === 'operational' ? <Check /> :
                    equipment.status === 'warning' ? <Warning /> :
                    <Error />
                  }
                  label={equipment.status.toUpperCase()}
                  color={
                    equipment.status === 'operational' ? 'success' :
                    equipment.status === 'warning' ? 'warning' :
                    'error'
                  }
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Última verificação: {equipment.lastCheck}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 