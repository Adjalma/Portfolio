import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { PictureAsPdf, TableChart } from '@mui/icons-material';

const reports = [
  { id: 1, title: 'Relatório Mensal - Março 2024', type: 'PDF' },
  { id: 2, title: 'Análise Comparativa Q1', type: 'Excel' },
  { id: 3, title: 'Indicadores de Qualidade', type: 'PDF' }
];

export const ReportGenerator = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Relatórios
      </Typography>
      <List>
        {reports.map((report) => (
          <ListItem key={report.id}>
            <ListItemText primary={report.title} secondary={`Formato: ${report.type}`} />
            <Box>
              <Button
                startIcon={report.type === 'PDF' ? <PictureAsPdf /> : <TableChart />}
                variant="outlined"
                size="small"
              >
                Download
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 