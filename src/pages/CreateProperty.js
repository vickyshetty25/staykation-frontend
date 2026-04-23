import React, { useState } from 'react';
import { Container, Typography, TextField, Button,
  Box, Alert, MenuItem } from '@mui/material';
import { createProperty } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateProperty = () => {
  const [form, setForm] = useState({
    title: '', description: '', basePrice: '',
    location: '', propertyType: 'APARTMENT',
    maxGuests: '', bedrooms: '', bathrooms: '',
    latitude: '', longitude: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProperty(form);
      navigate('/host/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create property');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        List a New Property
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Property Title" margin="normal" required
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})} />
        <TextField fullWidth label="Description" margin="normal"
          multiline rows={4}
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})} />
        <TextField fullWidth label="Location" margin="normal" required
          value={form.location}
          onChange={e => setForm({...form, location: e.target.value})} />
        <TextField fullWidth label="Base Price per Night (₹)" margin="normal"
          type="number" required value={form.basePrice}
          onChange={e => setForm({...form, basePrice: e.target.value})} />
        <TextField fullWidth select label="Property Type" margin="normal"
          value={form.propertyType}
          onChange={e => setForm({...form, propertyType: e.target.value})}>
          <MenuItem value="APARTMENT">Apartment</MenuItem>
          <MenuItem value="HOUSE">House</MenuItem>
          <MenuItem value="VILLA">Villa</MenuItem>
          <MenuItem value="ROOM">Room</MenuItem>
        </TextField>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField fullWidth label="Max Guests" margin="normal"
            type="number" value={form.maxGuests}
            onChange={e => setForm({...form, maxGuests: e.target.value})} />
          <TextField fullWidth label="Bedrooms" margin="normal"
            type="number" value={form.bedrooms}
            onChange={e => setForm({...form, bedrooms: e.target.value})} />
          <TextField fullWidth label="Bathrooms" margin="normal"
            type="number" value={form.bathrooms}
            onChange={e => setForm({...form, bathrooms: e.target.value})} />
        </Box>
        <Button fullWidth variant="contained" type="submit"
          sx={{ mt: 3, bgcolor: '#FF5A5F', py: 1.5 }}>
          Create Property
        </Button>
      </form>
    </Container>
  );
};

export default CreateProperty;