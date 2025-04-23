import React from 'react';
import { List, ListItem, ListItemText, Chip } from '@mui/material';
import { Vessel } from '../types';

interface Props {
  vessels: Vessel[];
}

export const VesselList: React.FC<Props> = ({ vessels }) => {
  return (
    <List>
      {vessels.map(vessel => (
        <ListItem key={vessel.id}>
          <ListItemText
            primary={vessel.name}
            secondary={`Lat: ${vessel.position.lat}, Lon: ${vessel.position.lon}`}
          />
          <Chip
            label={vessel.status}
            color={vessel.status === 'active' ? 'success' : 'warning'}
          />
        </ListItem>
      ))}
    </List>
  );
}; 