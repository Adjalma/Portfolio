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
import { Oil } from '@mui/icons-material';

interface Well {
  id: string;
  name: string;
  current_parameters: Record<string, number>;
}

interface Props {
  wells: Well[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const WellSelector: React.FC<Props> = ({
  wells,
  selectedId,
  onSelect
}) => {
  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Poços
        </Typography>
        <List>
          {wells.map((well) => (
            <ListItem
              key={well.id}
              button
              selected={well.id === selectedId}
              onClick={() => onSelect(well.id)}
            >
              <ListItemIcon>
                <Oil />
              </ListItemIcon>
              <ListItemText
                primary={well.name}
                secondary={`${Object.keys(well.current_parameters).length} parâmetros`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}; 