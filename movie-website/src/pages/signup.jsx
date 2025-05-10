import React from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    InputAdornment,
} from '@mui/material';
import { Lock, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <Box
            sx={{
                height: '100vh', // Full viewport height
                backgroundColor: '#3e2723', // Background color
                display: 'flex', // Flexbox for centering
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                px: 2, // Horizontal padding
            }}
        >
            <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                {/* App title */}
                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    color="#f5c518"
                    mb={3}
                >
                    MovieExplore
                </Typography>

                {/* Section title */}
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Sign Up
                </Typography>

                <Stack spacing={2}>
                    {/* Username input field */}
                    <TextField
                        label="Username"
                        type="text"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person /> {/* Icon for username */}
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* Password input field */}
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock /> {/* Icon for password */}
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Sign Up button */}
                    <Button variant="contained" color="warning" fullWidth>
                        Sign Up
                    </Button>

                    {/* Link to Sign In page */}
                    <Typography variant="body2" textAlign="center">
                        Already have an account?{' '}
                        <Link to="/signin" style={{ textDecoration: 'none', color: '#1976d2' }}>
                            Sign In
                        </Link>
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SignUpPage;