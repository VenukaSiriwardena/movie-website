import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8, // Top margin
        py: 3,
        backgroundColor: '#212121',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} MovieExplore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;