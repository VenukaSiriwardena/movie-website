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

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = ['Home', 'Popular', 'Favourites', 'Sign In'];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Left: Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="text"
              sx={{
                color: '#f5c518',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'none',
              }}
            >
              JustWatch
            </Button>
          </Box>

          {/* Center: Desktop Nav Links */}
          {!isMobile && (
            <Stack direction="row" spacing={3}>
              {navLinks.slice(0, 3).map((link) => (
                <Button key={link} sx={{ color: 'white' }}>
                  {link}
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
              <Button variant="outlined" color="inherit">
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
            {navLinks.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;