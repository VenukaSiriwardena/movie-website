import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // ⬅️ Add this

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Link config with routes
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Popular', path: '/popular' },
    { label: 'Favourites', path: '/favourites' },
    { label: 'Sign In', path: '/signin' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={Link}
              to="/"
              variant="text"
              sx={{
                color: '#f5c518',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'none',
              }}
            >
              MovieExplore
            </Button>
          </Box>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Stack direction="row" spacing={3}>
              {navLinks.slice(0, 3).map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  to={link.path}
                  sx={{ color: 'white' }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          )}

          {/* Right Side */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>

            {!isMobile && (
              <Button
                component={Link}
                to="/signin"
                variant="outlined"
                color="inherit"
              >
                Sign In
              </Button>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.label}
                component={Link}
                to={link.path}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;