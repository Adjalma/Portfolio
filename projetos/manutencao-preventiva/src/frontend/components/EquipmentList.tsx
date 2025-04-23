import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Paper,
  Typography,
  Box
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';

interface Equipment {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'critical';
}

interface Props {
  equipments: Equipment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const EquipmentList: React.FC<Props> = ({ 
  equipments, 
  selectedId, 
  onSelect 
}) => {
  const getStatusIcon = (status: Equipment['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle color="success" />;
      case 'maintenance':
        return <Warning color="warning" />;
      case 'critical':
        return <Error color="error" />;
    }
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Equipamentos
        </Typography>
        <List>
          {equipments.map((equipment) => (
            <ListItem 
              key={equipment.id}
              button
              selected={equipment.id === selectedId}
              onClick={() => onSelect(equipment.id)}
            >
              <ListItemIcon>
                {getStatusIcon(equipment.status)}
              </ListItemIcon>
              <ListItemText 
                primary={equipment.name}
                secondary={`${equipment.type} - ${equipment.location}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}; 