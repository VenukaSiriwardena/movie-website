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

// MovieCard component to display individual movie details
const MovieCard = ({ movie }) => {
  const theme = useTheme(); // Access the current theme
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

  return (
    // Link to navigate to the movie details page
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: isMobile ? '45%' : 180, // Adjust width based on screen size
          borderRadius: 2, 
          boxShadow: 3, 
          display: 'flex',
          flexDirection: 'column',
          mx: 'auto', 
        }}
      >
        {/* Box to contain the movie poster */}
        <Box
          sx={{
            width: '100%',
            aspectRatio: '2 / 3.2', 
            overflow: 'hidden', 
            borderTopLeftRadius: 8, 
            borderTopRightRadius: 8, 
          }}
        >
          {/* Movie poster image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Poster image URL
            alt={movie.title} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Cover the container
              display: 'block',
            }}
          />
        </Box>

        {/* Card content for movie details */}
        <CardContent sx={{ p: 1 }}>
          {/* Movie title */}
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            noWrap
            sx={{ mb: 0.5 }}
          >
            {movie.title}
          </Typography>
          {/* Release year */}
          <Typography variant="caption" color="text.secondary">
            {new Date(movie.release_date).getFullYear()}
          </Typography>
          {/* Movie rating */}
          <Typography variant="caption" color="text.secondary">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;