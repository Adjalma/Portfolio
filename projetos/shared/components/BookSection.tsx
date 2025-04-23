import React from 'react';
import { Card, Grid, Typography, Button, Box, Divider, useTheme } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

interface Book {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string;
}

interface Props {
  books: Book[];
}

export const BookSection: React.FC<Props> = ({ books }) => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Typography 
        variant="h3" 
        gutterBottom
        sx={{ 
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          color: theme.palette.primary.main 
        }}
      >
        Meus Livros Publicados
      </Typography>
      
      <Divider sx={{ mb: 6 }} />
      
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.title}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
                src={book.imageUrl}
                alt={book.title}
              />
              <Box sx={{ p: 3, flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    minHeight: 64,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2
                  }}
                >
                  {book.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    minHeight: 100,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4
                  }}
                >
                  {book.description}
                </Typography>
              </Box>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  href={book.amazonUrl}
                  target="_blank"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Ver na Amazon
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 