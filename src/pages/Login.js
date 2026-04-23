import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography,
  Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}
          textAlign="center">
          Login to Staykation
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} />
          <Button fullWidth variant="contained" type="submit"
            sx={{ mt: 2, bgcolor: '#FF5A5F', py: 1.5 }}>
            Login
          </Button>
        </form>
        <Typography mt={2} textAlign="center">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;