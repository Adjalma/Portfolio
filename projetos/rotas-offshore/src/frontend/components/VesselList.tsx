import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Card, Typography } from '@mui/material';
import { VesselIcon } from '@shared/components/icons';

interface Vessel {
  id: string;
  name: string;
  position: {
    lat: number;
    lon: number;
  };
  status: 'active' | 'inactive';
}

interface Props {
  vessels: Vessel[];
}

export const VesselList: React.FC<Props> = ({ vessels }) => {
  return (
    <Card>
      <List>
        {vessels.map((vessel) => (
          <ListItem key={vessel.id}>
            <ListItemIcon>
              <VesselIcon color={vessel.status === 'active' ? 'primary' : 'disabled'} />
            </ListItemIcon>
            <ListItemText 
              primary={vessel.name}
              secondary={`${vessel.position.lat.toFixed(2)}, ${vessel.position.lon.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}; 