import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/navbar';
import MovieCard from '../components/movieCard';

const SearchResults = () => {
  const { query } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchQuery, setSearchQuery] = useState(query || localStorage.getItem('lastSearch') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
            },
          }
        );
        setResults(response.data.results);
        localStorage.setItem('lastSearch', searchQuery);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div>
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
          Search Results
        </Typography>
        {searchQuery && (
          <Typography variant="h6" mt={1} color="gray">
            Showing results for: <strong>{searchQuery}</strong>
          </Typography>
        )}
      </Box>

      {/* Movies Section */}
      <Box sx={{ mt: 4, px: 2 }}>
        {loading ? (
          <Stack alignItems="center" mt={5} mb={5}>
            <CircularProgress />
          </Stack>
        ) : results.length > 0 ? (
          <Grid container spacing={2} justifyContent="center">
            {results.map((movie) => (
              <Grid item key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" mt={5}>
            No results found.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default SearchResults;