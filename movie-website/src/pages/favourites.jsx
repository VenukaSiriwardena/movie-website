import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Box, Typography, Grid } from '@mui/material';
import MovieCard from '../components/movieCard';
import Navbar from '../components/navbar';

const Favourites = () => {
  const { favourites } = useAuth();

  return (
    <Box minHeight="100vh">
      <Navbar />
      <Box p={2}>
        <Typography variant="h4" mb={3}>Your Favourites</Typography>
        {favourites.length === 0 ? (
          <Typography>No favourite movies yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {favourites.map((movie) => (
              <Grid item xs={6} sm={4} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Favourites;