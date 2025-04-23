import React from 'react';
import { Card, Typography, Box, Chip } from '@mui/material';
import { WellData } from '../types';

interface Props {
  data: WellData;
}

export const WellStatus: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Status do Poço {data.well_id}
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>
            Pressão: <Chip label={`${data.pressure} PSI`} />
          </Typography>
          
          <Typography>
            Temperatura: <Chip label={`${data.temperature}°C`} />
          </Typography>
          
          <Typography>
            Vazão: <Chip label={`${data.flow_rate} bbl/d`} />
          </Typography>
          
          <Typography>
            Status: <Chip 
              label={data.status} 
              color={data.status === 'normal' ? 'success' : 'error'} 
            />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}; 