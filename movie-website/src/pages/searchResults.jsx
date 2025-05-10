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
import Footer from '../components/footer';

const SearchResults = () => {
    const { query } = useParams(); // Get the search query from the URL parameters
    const theme = useTheme(); // Access the theme object for responsive design
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile

    // State to manage the search query, results, and loading status
    const [searchQuery, setSearchQuery] = useState(query || localStorage.getItem('lastSearch') || '');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchQuery) return; // Exit if there's no search query

        const fetchResults = async () => {
            setLoading(true); // Set loading to true while fetching data
            try {
                // Fetch search results from the API
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
                    {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API}`, // Use API key from environment variables
                        },
                    }
                );
                setResults(response.data.results); // Update results state with fetched data
                localStorage.setItem('lastSearch', searchQuery); // Save the search query to localStorage
            } catch (err) {
                console.error('Error fetching search results:', err); // Log any errors
            } finally {
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        fetchResults(); // Call the function to fetch results
    }, [searchQuery]); // Re-run the effect when searchQuery changes

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar /> {/* Navigation bar */}

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
            <Box flexGrow={1} sx={{ mt: 4, px: 2 }}>
                {loading ? (
                    // Show a loading spinner while fetching data
                    <Stack alignItems="center" mt={5} mb={5}>
                        <CircularProgress />
                    </Stack>
                ) : results.length > 0 ? (
                    // Display movie results in a grid
                    <Grid container spacing={2} justifyContent="center">
                        {results.map((movie) => (
                            <Grid item key={movie.id}>
                                <MovieCard movie={movie} /> {/* Render a movie card for each result */}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    // Show a message if no results are found
                    <Typography variant="h6" align="center" mt={5}>
                        No results found.
                    </Typography>
                )}
            </Box>

            <Footer /> {/* Footer section */}
        </Box>
    );
};

export default SearchResults;