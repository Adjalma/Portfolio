import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { Warning, ErrorOutline, Info } from '@mui/icons-material';

const incidents = [
  {
    id: 1,
    type: 'high',
    description: 'Vazamento de óleo detectado',
    date: '2024-03-20',
    status: 'Em investigação'
  },
  {
    id: 2,
    type: 'medium',
    description: 'Falha em equipamento de proteção',
    date: '2024-03-18',
    status: 'Resolvido'
  },
  {
    id: 3,
    type: 'low',
    description: 'Procedimento de segurança não seguido',
    date: '2024-03-15',
    status: 'Em análise'
  }
];

export const IncidentReports = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Relatórios de Incidentes
      </Typography>
      <List>
        {incidents.map((incident) => (
          <ListItem key={incident.id}>
            <ListItemIcon>
              {incident.type === 'high' && <Warning color="error" />}
              {incident.type === 'medium' && <ErrorOutline color="warning" />}
              {incident.type === 'low' && <Info color="info" />}
            </ListItemIcon>
            <ListItemText
              primary={incident.description}
              secondary={`Data: ${incident.date}`}
            />
            <Chip
              label={incident.status}
              color={
                incident.status === 'Resolvido' ? 'success' :
                incident.status === 'Em investigação' ? 'warning' : 'info'
              }
              size="small"
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 