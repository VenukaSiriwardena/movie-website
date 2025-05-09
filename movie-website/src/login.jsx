import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';

function LoginPage() {
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSignIn = () => {
    alert('Signed In with username: ' + signInUsername);
  };

  const handleSignUp = () => {
    alert('Signed Up with username: ' + signUpUsername);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: 400,
          margin: 'auto',
          marginTop: '100px',
        }}
      >
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleDarkModeToggle} />}
          label="Dark Mode"
        />

        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Movie Website
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>

          {tabValue === 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Sign In</Typography>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={signInUsername}
                onChange={(e) => setSignInUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button variant="contained" fullWidth onClick={handleSignIn}>
                Sign In
              </Button>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Sign Up</Typography>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <Button variant="contained" fullWidth onClick={handleSignUp}>
                Sign Up
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;