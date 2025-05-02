import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Warning, Error, CheckCircle } from '@mui/icons-material';

const alerts = [
  { id: 1, type: 'warning', message: 'Pressão acima do normal', time: '10:30' },
  { id: 2, type: 'error', message: 'Temperatura crítica', time: '10:45' },
  { id: 3, type: 'success', message: 'Sistema normalizado', time: '11:00' },
];

export const AlertPanel = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Alertas
      </Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.id}>
            <ListItemIcon>
              {alert.type === 'warning' && <Warning color="warning" />}
              {alert.type === 'error' && <Error color="error" />}
              {alert.type === 'success' && <CheckCircle color="success" />}
            </ListItemIcon>
            <ListItemText 
              primary={alert.message}
              secondary={alert.time}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 