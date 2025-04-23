import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export const MaintenanceSchedule: React.FC<{
  equipments: any[];
  predictions: any[];
}> = ({ equipments, predictions }) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6">Agenda de Manutenção</Typography>
        {/* Implementar visualização do calendário */}
      </Box>
    </Card>
  );
}; 