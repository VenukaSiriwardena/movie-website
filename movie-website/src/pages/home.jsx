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
  const [loading, setLoading] = useState(true);

  const url =
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

  const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjUwNzU3ZGM1OWZjYTQxMjlkYTZhYTQ3Yjk5MTY1NSIsIm5iZiI6MTc0NjgwNzAzMS41NTQsInN1YiI6IjY4MWUyOGY3ZjYxYmUyZDhjNjkzYjQ0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5o8x0cCOOSaDOKZ0kLiF500tjHU4m7KyflDggXt2wAE',
  };

  useEffect(() => {
    axios
      .get(url, { headers })
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
      </Box>
    </div>
  );
};

export default HomePage;