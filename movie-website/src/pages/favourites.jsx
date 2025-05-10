import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Box, Typography, Grid } from '@mui/material';
import MovieCard from '../components/movieCard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Favourites component to display user's favourite movies
const Favourites = () => {
    const { favourites } = useAuth(); // Get the list of favourite movies from the AuthContext

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Navbar at the top */}
            <Navbar />

            {/* Header section */}
            <Box
                sx={{
                    py: 6,
                    backgroundColor: '#1c1c1c',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" fontWeight="bold">
                    Your Favourites
                </Typography>
            </Box>

            {/* Main content section */}
            <Box flexGrow={1} p={2}>
                {/* Show a message if there are no favourite movies */}
                {favourites.length === 0 ? (
                    <Typography>No favourite movies yet.</Typography>
                ) : (
                    // Display favourite movies in a grid
                    <Grid container spacing={2}>
                        {favourites.map((movie) => (
                            <Grid item xs={6} sm={4} md={3} key={movie.id}>
                                <MovieCard movie={movie} /> {/* Render each movie using MovieCard */}
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Footer at the bottom */}
            <Footer />
        </Box>
    );
};

export default Favourites;