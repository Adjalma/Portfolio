import React from 'react';
import { Paper, Typography, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import { PictureAsPdf, Share } from '@mui/icons-material';

const reports = [
  { id: 1, title: 'Análise Mensal - Março 2024', date: '01/04/2024' },
  { id: 2, title: 'Relatório de Qualidade Q1', date: '31/03/2024' },
  { id: 3, title: 'Análise de Tendências', date: '15/03/2024' },
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
            <ListItemText 
              primary={report.title}
              secondary={report.date}
            />
            <Button startIcon={<PictureAsPdf />} sx={{ mr: 1 }}>
              PDF
            </Button>
            <Button startIcon={<Share />}>
              Compartilhar
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 