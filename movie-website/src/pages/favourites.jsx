import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Box, Typography, Grid } from '@mui/material';
import MovieCard from '../components/movieCard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Favourites = () => {
  const { favourites } = useAuth();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: 6,
          backgroundColor: '#1c1c1c',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Your Favourites
        </Typography>
      </Box>

      {/* Movie Grid */}
      <Box flexGrow={1} p={2}>
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

      <Footer />
    </Box>
  );
};

export default Favourites;