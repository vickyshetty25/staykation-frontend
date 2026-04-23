import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography,
  Alert, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    contactNumber: '', role: 'GUEST'
  });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      loginUser(res.data.token, res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}
          textAlign="center">
          Create Account
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Full Name" margin="normal"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} />
          <TextField fullWidth label="Email" type="email" margin="normal"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} />
          <TextField fullWidth label="Password" type="password" margin="normal"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} />
          <TextField fullWidth label="Contact Number" margin="normal"
            value={form.contactNumber}
            onChange={e => setForm({...form,
              contactNumber: e.target.value})} />
          <TextField fullWidth select label="Register as" margin="normal"
            value={form.role}
            onChange={e => setForm({...form, role: e.target.value})}>
            <MenuItem value="GUEST">Guest</MenuItem>
            <MenuItem value="HOST">Host</MenuItem>
          </TextField>
          <Button fullWidth variant="contained" type="submit"
            sx={{ mt: 2, bgcolor: '#FF5A5F', py: 1.5 }}>
            Register
          </Button>
        </form>
        <Typography mt={2} textAlign="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;