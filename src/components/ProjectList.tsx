import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Chip, Box } from '@mui/material';
import { GitHub, Preview } from '@mui/icons-material';
import { projects } from '../config/projects';

export const ProjectList = () => {
  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {project.technologies.map((tech) => (
                  <Chip key={tech} label={tech} size="small" />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                href={project.githubUrl}
                target="_blank"
                startIcon={<GitHub />}
              >
                Código
              </Button>
              <Button
                size="small"
                href={project.demoUrl}
                startIcon={<Preview />}
              >
                Demo
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 