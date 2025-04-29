import React from 'react';
import { Paper, Typography, Grid, Card, CardContent, LinearProgress } from '@mui/material';

const equipmentHealthData = [
  {
    id: 'PUMP-001',
    name: 'Bomba Centrífuga',
    health: 85,
    nextMaintenance: '15 dias',
    riskLevel: 'Baixo'
  },
  {
    id: 'MOTOR-002',
    name: 'Motor Elétrico Principal',
    health: 65,
    nextMaintenance: '3 dias',
    riskLevel: 'Médio'
  },
  {
    id: 'VALVE-003',
    name: 'Válvula de Controle',
    health: 45,
    nextMaintenance: 'Imediato',
    riskLevel: 'Alto'
  }
];

export const EquipmentHealth = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Saúde dos Equipamentos
      </Typography>
      <Grid container spacing={2}>
        {equipmentHealthData.map((equipment) => (
          <Grid item xs={12} key={equipment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{equipment.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  ID: {equipment.id}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Próxima Manutenção: {equipment.nextMaintenance}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Nível de Risco: {equipment.riskLevel}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={equipment.health}
                  color={
                    equipment.health > 70 ? 'success' :
                    equipment.health > 50 ? 'warning' : 'error'
                  }
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" align="right">
                  Saúde: {equipment.health}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 