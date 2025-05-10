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
  const theme = useTheme(); // Access the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  const [movies, setMovies] = useState([]); // State to store movies
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  const fetchMovies = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`, // Use API key from environment variables
          },
        }
      );

      setMovies(response.data.results); // Update movies state with fetched data
    } catch (error) {
      console.error('Failed to fetch movies:', error); // Log error if fetching fails
    }
    setLoading(false); // Set loading to false after fetching data
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar /> {/* Navigation bar */}

      {/* Hero Section */}
      <Box
        sx={{
          py: 6,
          backgroundColor: '#1c1c1c', // Background color for hero section
          color: '#fff', // Text color for hero section
          textAlign: 'center', // Center align text
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight="bold">
          Popular Movies {/* Title */}
        </Typography>
      </Box>

      {/* Movies Section */}
      <Box flexGrow={1} sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} /> {/* Render each movie card */}
            </Grid>
          ))}
        </Grid>

        {loading && (
          <Stack alignItems="center" mt={5} mb={5}>
            <CircularProgress /> {/* Show loading spinner while fetching */}
          </Stack>
        )}
      </Box>

      <Footer /> {/* Footer */}
    </Box>
  );
};

export default HomePage;