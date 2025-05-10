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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [showLast, setShowLast] = useState(false);

  const navigate = useNavigate();
  const { toggleColorMode, mode } = useContext(ThemeContext);
  const { user, logout } = useAuth(); // 🔥 Auth context

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Popular', path: '/popular' },
    { label: 'Favourites', path: '/favourites' },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('lastSearch');
    if (stored) setLastSearch(stored);
  }, []);

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigate(`/search/${searchText}`);
      localStorage.setItem('lastSearch', searchText);
      setLastSearch(searchText);
      setSearchText('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
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

          <Stack direction="row" spacing={1} alignItems="center">
            {searchOpen ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setShowLast(true)}
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
                      setSearchText(lastSearch);
                      navigate(`/search/${lastSearch}`);
                      setSearchOpen(false);
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

            <IconButton onClick={toggleColorMode} sx={{ color: 'white' }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

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