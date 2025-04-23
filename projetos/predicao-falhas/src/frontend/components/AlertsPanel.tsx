import React from 'react';
import { Card, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

interface Alert {
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: string;
}

interface Props {
  alerts: Alert[];
}

export const AlertsPanel: React.FC<Props> = ({ alerts }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Alertas
        </Typography>
        
        <List>
          {alerts.map((alert, index) => (
            <ListItem key={index}>
              {getIcon(alert.type)}
              <ListItemText
                primary={alert.message}
                secondary={new Date(alert.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}; 