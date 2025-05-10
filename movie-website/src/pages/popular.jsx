import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/navbar';
import MovieCard from '../components/movieCard';
import Footer from '../components/footer';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
          },
        }
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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
        <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight="bold">
          Popular Movies
        </Typography>
      </Box>

      {/* Movies Section */}
      <Box flexGrow={1} sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {loading && (
          <Stack alignItems="center" mt={5} mb={5}>
            <CircularProgress />
          </Stack>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;