import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button,
  Card, Alert, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty, createBooking } from '../services/api';

const Booking = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({
    startDate: '', endDate: '', modeOfPayment: 'CARD'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProperty(propertyId).then(res => setProperty(res.data.property));
  }, [propertyId]);

  const calculateTotal = () => {
    if (!form.startDate || !form.endDate || !property) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.basePrice : 0;
  };

  const handleBooking = async () => {
    try {
      await createBooking({
        propertyId, ...form
      });
      setSuccess('Booking confirmed! Payment processed successfully.');
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (!property) return <Typography mt={4} textAlign="center">
    Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Book {property.title}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Card sx={{ p: 3 }}>
        <TextField fullWidth label="Check-in Date" type="date" margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.startDate}
          onChange={e => setForm({...form, startDate: e.target.value})} />
        <TextField fullWidth label="Check-out Date" type="date" margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.endDate}
          onChange={e => setForm({...form, endDate: e.target.value})} />
        <TextField fullWidth select label="Payment Method" margin="normal"
          value={form.modeOfPayment}
          onChange={e => setForm({...form, modeOfPayment: e.target.value})}>
          <MenuItem value="CARD">Credit/Debit Card</MenuItem>
          <MenuItem value="UPI">UPI</MenuItem>
          <MenuItem value="NETBANKING">Net Banking</MenuItem>
        </TextField>

        {calculateTotal() > 0 && (
          <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mt: 2 }}>
            <Typography>
              ₹{property.basePrice} x {calculateTotal() /
                property.basePrice} nights
            </Typography>
            <Typography variant="h6" fontWeight="bold" mt={1}>
              Total: ₹{calculateTotal()}
            </Typography>
          </Box>
        )}

        <Button fullWidth variant="contained"
          sx={{ mt: 3, bgcolor: '#FF5A5F', py: 1.5 }}
          onClick={handleBooking}
          disabled={!form.startDate || !form.endDate}>
          Confirm & Pay ₹{calculateTotal()}
        </Button>
      </Card>
    </Container>
  );
};

export default Booking;