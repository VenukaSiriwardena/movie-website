import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/navbar';
import MovieCard from '../components/movieCard';
import Footer from '../components/footer';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  const [movies, setMovies] = useState([]); // State to store movies
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(null); // Total pages available
  const [loading, setLoading] = useState(false); // Loading state

  // Function to fetch movies from the API
  const fetchMovies = async (pageNumber) => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`, // Use API key from environment variables
          },
        }
      );

      const fetchedMovies = response.data.results; // Extract movies from API response
      const totalPagesFromApi = response.data.total_pages; // Extract total pages from API response

      // Update movies state with unique movies
      setMovies((prevMovies) => {
        const movieIds = new Set(prevMovies.map((m) => m.id));
        const uniqueNewMovies = fetchedMovies.filter((m) => !movieIds.has(m.id));
        return [...prevMovies, ...uniqueNewMovies];
      });

      setTotalPages(totalPagesFromApi); // Update total pages state
    } catch (error) {
      console.error('Failed to fetch movies:', error); // Log error if fetching fails
    }
    setLoading(false); // Set loading to false after fetching
  };

  // Fetch movies when the page number changes
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  return (
    <div>
      <Navbar /> {/* Navbar component */}

      {/* Hero section */}
      <Box
        sx={{
          height: '90vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1577033117892-6d498c6c7921?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box sx={{ zIndex: 1, maxWidth: 700 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            fontWeight="bold"
            gutterBottom
          >
            Your streaming guide for movies
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, px: 1 }}>
            Find where to stream new, popular & upcoming entertainment
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* Button to navigate to popular movies */}
            <Button
              variant="contained"
              color="warning"
              fullWidth={isMobile}
              component={Link}
              to="/popular"
            >
              Popular Movies
            </Button>

            {/* Button to navigate to sign-up page */}
            <Button
              variant="outlined"
              color="inherit"
              fullWidth={isMobile}
              sx={{ mt: isMobile ? 1 : 0 }}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Movies grid */}
      <Box sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} /> {/* Movie card component */}
            </Grid>
          ))}
        </Grid>

        {/* Load more button or loading spinner */}
        <Stack alignItems="center" mt={5} mb={5}>
          {loading ? (
            <CircularProgress /> // Show spinner while loading
          ) : (
            page < totalPages && (
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            )
          )}
        </Stack>
      </Box>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default HomePage;