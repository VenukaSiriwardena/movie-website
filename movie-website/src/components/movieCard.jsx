import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const MovieCard = ({ movie }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        width: isMobile ? '45%' : 180, // smaller width
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
      }}
    >
      {/* Fixed-size image container */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '2 / 3.2', // slightly shorter
          overflow: 'hidden',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          noWrap
          sx={{ mb: 0.5 }}
        >
          {movie.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ⭐ {movie.vote_average.toFixed(1)} / 10
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default MovieCard;