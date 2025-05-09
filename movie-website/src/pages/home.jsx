import React from 'react';
import { Box, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../components/navbar';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        ></Box>

        <Box sx={{ zIndex: 1, maxWidth: 700 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            fontWeight="bold"
            gutterBottom
          >
            Your streaming guide for movies, TV shows & sports
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, px: 1 }}>
            Find where to stream new, popular & upcoming entertainment.
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button variant="contained" color="warning" fullWidth={isMobile}>
              Discover Movies & TV Shows
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              fullWidth={isMobile}
              sx={{ mt: isMobile ? 1 : 0 }}
            >
              Features
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;