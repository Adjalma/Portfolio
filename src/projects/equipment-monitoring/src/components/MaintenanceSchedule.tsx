import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Build, Schedule } from '@mui/icons-material';

const maintenanceSchedule = [
  {
    id: 1,
    equipment: 'PUMP-001',
    type: 'Preventiva',
    date: '2024-03-25',
    status: 'scheduled'
  },
  {
    id: 2,
    equipment: 'VALVE-002',
    type: 'Corretiva',
    date: '2024-03-22',
    status: 'urgent'
  },
  {
    id: 3,
    equipment: 'MOTOR-003',
    type: 'Preditiva',
    date: '2024-03-28',
    status: 'scheduled'
  }
];

export const MaintenanceSchedule = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Agenda de Manutenção
      </Typography>
      <List>
        {maintenanceSchedule.map((maintenance) => (
          <ListItem key={maintenance.id}>
            <ListItemIcon>
              {maintenance.status === 'urgent' ? <Build color="error" /> : <Schedule />}
            </ListItemIcon>
            <ListItemText
              primary={`${maintenance.equipment} - ${maintenance.type}`}
              secondary={`Data: ${maintenance.date}`}
            />
            <Chip
              label={maintenance.status.toUpperCase()}
              color={maintenance.status === 'urgent' ? 'error' : 'primary'}
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 