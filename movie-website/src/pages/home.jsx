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

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = 'API_KEY'; 

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (totalPages && page > totalPages) return;

    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page,
          sort_by: 'popularity.desc',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      setMovies((prev) => [...prev, ...res.data.results]);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section – keep your existing hero code here */}

      <Box sx={{ mt: 4, px: 2 }}>
        <Typography variant="h5" mb={2}>
          Popular Movies
        </Typography>
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
          ) : page < totalPages ? (
            <Button variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
          ) : (
            <Typography variant="body2" color="text.secondary">
              You have reached the end.
            </Typography>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default HomePage;