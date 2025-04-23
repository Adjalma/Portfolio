import React from 'react';
import { Card, Typography, Box, Chip } from '@mui/material';
import { SensorData } from '../types';

interface Props {
  data: SensorData;
}

export const EquipmentStatus: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Status do Equipamento
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>
            Temperatura: <Chip label={`${data.temperature}°C`} />
          </Typography>
          
          <Typography>
            Pressão: <Chip label={`${data.pressure} PSI`} />
          </Typography>
          
          <Typography>
            Vibração: <Chip label={`${data.vibration} Hz`} />
          </Typography>
          
          <Typography>
            Nível de Ruído: <Chip label={`${data.noise_level} dB`} />
          </Typography>
          
          <Typography>
            Consumo de Energia: <Chip label={`${data.power_consumption} W`} />
          </Typography>
          
          <Typography>
            Horas de Operação: <Chip label={`${data.operational_hours}h`} />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
