import React from 'react';
import { List, ListItem, ListItemText, Alert, Box, Typography } from '@mui/material';

interface Props {
  alerts: string[];
}

export const AlertsPanel: React.FC<Props> = ({ alerts }) => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Alertas de Segurança
      </Typography>
      <List>
        {alerts.map((alert, index) => (
          <ListItem key={index}>
            <Alert severity="warning" sx={{ width: '100%' }}>
              {alert}
            </Alert>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 