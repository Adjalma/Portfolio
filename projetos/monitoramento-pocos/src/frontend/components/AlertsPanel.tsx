import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Alert } from '../types';

interface Props {
  alerts: Alert[];
}

export const AlertsPanel: React.FC<Props> = ({ alerts }) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Alertas
        </Typography>
        <List>
          {alerts.map((alert) => (
            <ListItem key={alert.id}>
              <ListItemText 
                primary={alert.message}
                secondary={new Date(alert.timestamp).toLocaleString()}
                sx={{ color: alert.type === 'error' ? 'error.main' : 'warning.main' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}; 