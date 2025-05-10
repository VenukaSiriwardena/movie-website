import React, { useState, useContext, useEffect } from 'react';
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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './themeContext';
import { useAuth } from '../components/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is mobile
  const [drawerOpen, setDrawerOpen] = useState(false); // State for mobile drawer
  const [searchOpen, setSearchOpen] = useState(false); // State for search bar visibility
  const [searchText, setSearchText] = useState(''); // State for search input text
  const [lastSearch, setLastSearch] = useState(''); // State for storing the last search
  const [showLast, setShowLast] = useState(false); // State for showing the last search suggestion

  const navigate = useNavigate();
  const { toggleColorMode, mode } = useContext(ThemeContext); // Theme context for dark/light mode
  const { user, logout } = useAuth(); // Authentication context for user state and logout function

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Popular', path: '/popular' },
    { label: 'Favourites', path: '/favourites' },
  ];

  // Load the last search from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('lastSearch');
    if (stored) setLastSearch(stored);
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigate(`/search/${searchText}`); // Navigate to the search results page
      localStorage.setItem('lastSearch', searchText); // Save the search text to localStorage
      setLastSearch(searchText); // Update the last search state
      setSearchText(''); // Clear the search input
      setSearchOpen(false); // Close the search bar
    }
  };

  return (
    <>
      {/* AppBar for the navigation bar */}
      <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          {/* Logo/Button for the home page */}
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

          {/* Navigation links for larger screens */}
          {!isMobile && (
            <Stack direction="row" spacing={3}>
              {navLinks.map((link) => (
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

          {/* Right-side icons and buttons */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Search bar */}
            {searchOpen ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setShowLast(true)} // Show last search suggestion on focus
                    style={{
                      padding: '6px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.9rem',
                      maxWidth: isMobile ? '120px' : '200px',
                      width: '100%',
                    }}
                  />
                  <Button onClick={handleSearch} variant="contained" size="small" sx={{ ml: 1, whiteSpace: 'nowrap' }}>
                    Go
                  </Button>
                </Box>

                {/* Last search suggestion */}
                {showLast && searchText === '' && lastSearch && (
                  <Button
                    size="small"
                    sx={{
                      mt: 0.5,
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      color: '#f5c518',
                      minHeight: 'auto',
                      padding: '2px 4px',
                    }}
                    onClick={() => {
                      setSearchText(lastSearch); // Set the search input to the last search
                      navigate(`/search/${lastSearch}`); // Navigate to the last search results
                      setSearchOpen(false); // Close the search bar
                    }}
                  >
                    Last search: {lastSearch}
                  </Button>
                )}
              </Box>
            ) : (
              <IconButton sx={{ color: 'white' }} onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            )}

            {/* Dark/Light mode toggle */}
            <IconButton onClick={toggleColorMode} sx={{ color: 'white' }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Sign In/Sign Out button for larger screens */}
            {!isMobile && (
              user ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/signin"
                  variant="outlined"
                  color="inherit"
                >
                  Sign In
                </Button>
              )
            )}

            {/* Mobile menu icon */}
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

      {/* Drawer for mobile navigation */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {/* Navigation links */}
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

            {/* Sign In/Sign Out button */}
            <ListItem
              button
              onClick={user ? logout : () => navigate('/signin')}
            >
              <ListItemText primary={user ? 'Sign Out' : 'Sign In'} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;