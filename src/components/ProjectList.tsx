import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { projects } from '../config/projects';

export function ProjectList() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Projetos
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>
                <Button 
                  component={Link} 
                  to={project.path}
                  variant="contained" 
                  color="primary"
                >
                  Ver Projeto
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 