import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

const incidents = [
  {
    id: 1,
    type: 'high',
    description: 'Vazamento detectado na área 3',
    date: '2024-03-20',
    status: 'Em andamento'
  },
  {
    id: 2,
    type: 'medium',
    description: 'Falha no equipamento de proteção',
    date: '2024-03-19',
    status: 'Resolvido'
  },
  {
    id: 3,
    type: 'low',
    description: 'Atualização de procedimento necessária',
    date: '2024-03-18',
    status: 'Pendente'
  }
];

export const IncidentReport = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Relatório de Incidentes
      </Typography>
      <List>
        {incidents.map((incident) => (
          <ListItem key={incident.id}>
            <ListItemIcon>
              {incident.type === 'high' && <Error color="error" />}
              {incident.type === 'medium' && <Warning color="warning" />}
              {incident.type === 'low' && <Info color="info" />}
            </ListItemIcon>
            <ListItemText
              primary={incident.description}
              secondary={incident.date}
            />
            <Chip
              label={incident.status}
              color={
                incident.status === 'Resolvido'
                  ? 'success'
                  : incident.status === 'Em andamento'
                  ? 'warning'
                  : 'error'
              }
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 