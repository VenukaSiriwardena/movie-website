import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    signup(username, password);
    navigate('/');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Sign Up</Typography>
      <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
    </Box>
  );
};

export default Signup;