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

const SignInPage = () => {
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
        {/* App Title */}
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#f5c518" // Custom color
          mb={3}
        >
          MovieExplore
        </Typography>

        {/* Sign In Header */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Sign In
        </Typography>

        <Stack spacing={2}>
          {/* Username Input */}
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
          {/* Password Input */}
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

          {/* Sign In Button */}
          <Button variant="contained" color="warning" fullWidth>
            Sign In
          </Button>

          {/* Sign Up Link */}
          <Typography variant="body2" textAlign="center">
            Don’t have an account?{' '}
            <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignInPage;