import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Grid,
  Avatar,
  Button,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../components/navbar';
import { useAuth } from '../components/AuthContext';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const { addFavourite, removeFavourite, isFavourite, user } = useAuth();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
            },
          }
        );
        setCast(response.data.cast.slice(0, 5));
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
            },
          }
        );
        const trailer = response.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchMovieDetails();
    fetchCredits();
    fetchTrailer();
  }, [id]);

  if (!movie) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box minHeight="100vh">
      <Navbar />
      <Box
        px={2}
        py={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          maxWidth="800px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{
              width: { xs: '100%', sm: '70%', md: '50%' },
              borderRadius: 2,
              boxShadow: 3,
              mb: 3,
            }}
          />

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movie.title}
          </Typography>

          {movie.tagline && (
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {movie.tagline}
            </Typography>
          )}

          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>

          <Box mb={2}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                color="primary"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <Box mt={2} mb={2}>
            <Typography variant="h6" gutterBottom>
              Top Cast
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              {cast.map((member) => (
                <Box key={member.id} textAlign="center">
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                    alt={member.name}
                    sx={{ width: 72, height: 72, mx: 'auto', mb: 1 }}
                  />
                  <Typography variant="body2">{member.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {trailerUrl && (
            <Box mt={2}>
              <Button
                variant="contained"
                color="error"
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </Button>
            </Box>
          )}

          <Box mt={2}>
            {user ? (
              isFavourite(movie.id) ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFavourite(movie.id)}
                  sx={{ mr: 2 }}
                >
                  Remove Favourite
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addFavourite(movie)}
                  sx={{ mr: 2 }}
                >
                  Add to Favourites
                </Button>
              )
            ) : (
              <Typography color="error">Login to add favourites</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;