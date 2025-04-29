import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';
import { Book } from '../../../types/books';
import { books } from '../../../config/books';

export const BookList = () => {
  return (
    <Grid container spacing={2}>
      {books.map((book: Book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={book.coverImage}
              alt={book.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.publisher}, {book.year}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button startIcon={<Download />} variant="contained" size="small">
                  Download
                </Button>
                <Button startIcon={<Visibility />} variant="outlined" size="small">
                  Visualizar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}; 