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
        height: '100vh',
        backgroundColor: '#3e2723', // Dark brown
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="#f5c518" // Yellow
          mb={3}
        >
          MovieExplore
        </Typography>

        <Typography variant="h6" fontWeight="bold" mb={2}>
          Sign In
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="warning" fullWidth>
            Sign In
          </Button>

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