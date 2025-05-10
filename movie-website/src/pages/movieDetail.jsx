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
    const { id } = useParams(); // Get the movie ID from the URL parameters
    const [movie, setMovie] = useState(null); // State to store movie details
    const [cast, setCast] = useState([]); // State to store cast details
    const [trailerUrl, setTrailerUrl] = useState(''); // State to store trailer URL
    const { addFavourite, removeFavourite, isFavourite, user } = useAuth(); // Auth context functions and user info

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch movie details from the API
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
                        },
                    }
                );
                setMovie(response.data); // Update movie state
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const fetchCredits = async () => {
            try {
                // Fetch cast details from the API
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`,
                        },
                    }
                );
                setCast(response.data.cast.slice(0, 5)); // Update cast state with top 5 cast members
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        };

        const fetchTrailer = async () => {
            try {
                // Fetch trailer details from the API
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
                    setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`); // Update trailer URL state
                }
            } catch (error) {
                console.error('Error fetching trailer:', error);
            }
        };

        fetchMovieDetails(); // Fetch movie details on component mount
        fetchCredits(); // Fetch cast details on component mount
        fetchTrailer(); // Fetch trailer details on component mount
    }, [id]); // Re-run effect when movie ID changes

    if (!movie) {
        // Show loading spinner if movie details are not yet loaded
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box minHeight="100vh">
            <Navbar /> {/* Navbar component */}
            <Box p={{ xs: 2, md: 4 }}>
                <Grid container spacing={4} wrap="nowrap" sx={{ flexDirection: { xs: 'row', md: 'row' }, overflowX: 'auto' }}>
                    <Grid item sx={{ flexShrink: 0 }}>
                        {/* Movie poster */}
                        <Box
                            component="img"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            sx={{
                                width: { xs: 240, sm: 300, md: 350, lg: 400 },
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Grid>

                    <Grid item sx={{ pl: { xs: 3, sm: 4 }, minWidth: 0 }}>
                        {/* Movie title */}
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {movie.title}
                        </Typography>

                        {/* Movie tagline */}
                        {movie.tagline && (
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {movie.tagline}
                            </Typography>
                        )}

                        {/* Movie overview */}
                        <Typography variant="body1" paragraph>
                            {movie.overview}
                        </Typography>

                        {/* Movie genres */}
                        <Box mb={2}>
                            {movie.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} color="primary" sx={{ mr: 1, mb: 1, fontSize: '1rem' }} />
                            ))}
                        </Box>

                        {/* Top cast */}
                        <Box mt={2}>
                            <Typography variant="h6" gutterBottom>
                                Top Cast
                            </Typography>
                            <Box display="flex" gap={2} flexWrap="wrap">
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

                        {/* Trailer button */}
                        {trailerUrl && (
                            <Box mt={3}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    href={trailerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ fontSize: '1rem', px: 3, py: 1.5 }}
                                >
                                    Watch Trailer
                                </Button>
                            </Box>
                        )}

                        {/* Favourites button */}
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MovieDetail;