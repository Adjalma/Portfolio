import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

const projects = [
  {
    id: 1,
    title: 'Monitoramento de Poços',
    description: 'Sistema de monitoramento em tempo real de poços de petróleo',
    image: '/images/projects/monitoring.jpg',
    link: '/monitoramento-pocos'
  },
  {
    id: 2,
    title: 'Análise de Óleo',
    description: 'Dashboard para análise de qualidade de óleo',
    image: '/images/projects/oil.jpg',
    link: '/oil-analysis'
  },
  // Adicione mais projetos conforme necessário
];

export const ProjectList = () => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card>
            <CardActionArea href={project.link}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 