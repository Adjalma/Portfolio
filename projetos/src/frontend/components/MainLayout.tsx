import React from 'react';
import { Container, Grid, Box, Divider } from '@mui/material';
import { BookSection } from '@shared/components/BookSection';
import { books } from '@shared/config/books';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {children}
        <Divider sx={{ my: 4 }} />
        <BookSection books={books} />
      </Box>
    </Container>
  );
}; 