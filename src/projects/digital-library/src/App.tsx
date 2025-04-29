import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { BookList } from './components/BookList';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';

export const DigitalLibraryApp = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Biblioteca Digital O&G
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} md={3}>
          <CategoryFilter />
        </Grid>
        <Grid item xs={12} md={9}>
          <BookList />
        </Grid>
      </Grid>
    </Box>
  );
}; 