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
import axios from 'axios';
import Navbar from '../components/navbar';
import MovieCard from '../components/movieCard';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
          },
        }
        
      );

      const fetchedMovies = response.data.results;
      const totalPagesFromApi = response.data.total_pages;

      // Only append new movies if they don't already exist (to avoid duplicates)
      setMovies((prevMovies) => {
        const movieIds = new Set(prevMovies.map((m) => m.id));
        const uniqueNewMovies = fetchedMovies.filter((m) => !movieIds.has(m.id));
        return [...prevMovies, ...uniqueNewMovies];
      });

      setTotalPages(totalPagesFromApi);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          background: 'linear-gradient(to right, #1c1c1c, #333)',
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
            Your streaming guide for movies, TV shows & sports
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, px: 1 }}>
            Find where to stream new, popular & upcoming entertainment.
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="warning" fullWidth={isMobile}>
              Discover Movies & TV Shows
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth={isMobile}
              sx={{ mt: isMobile ? 1 : 0 }}
            >
              Features
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Movies Section */}
      <Box sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" mt={5} mb={5}>
          {loading ? (
            <CircularProgress />
          ) : (
            page < totalPages && (
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            )
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default HomePage;