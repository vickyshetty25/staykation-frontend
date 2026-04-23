import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Box,
  Chip, Button, Alert } from '@mui/material';
import { getMyBookings, cancelBooking } from '../services/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMyBookings().then(res => setBookings(res.data));
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      setMessage('Booking cancelled and refund initiated!');
      getMyBookings().then(res => setBookings(res.data));
    } catch (err) {
      setMessage('Cancellation failed');
    }
  };

  const getStatusColor = (status) => {
    const colors = { CONFIRMED: 'success', CANCELLED: 'error',
      PENDING: 'warning', COMPLETED: 'info' };
    return colors[status] || 'default';
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        My Bookings
      </Typography>
      {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
      {bookings.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" mt={4}>
          No bookings yet. Start exploring properties!
        </Typography>
      ) : (
        bookings.map(booking => (
          <Card key={booking.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {booking.property?.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {booking.startDate} → {booking.endDate}
                  </Typography>
                  <Typography fontWeight="bold" color="#FF5A5F" mt={1}>
                    ₹{booking.totalPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payment: {booking.paymentStatus} |
                    ID: {booking.paymentId}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column',
                  gap: 1, alignItems: 'flex-end' }}>
                  <Chip label={booking.status}
                    color={getStatusColor(booking.status)} size="small" />
                  {booking.status === 'CONFIRMED' && (
                    <Button size="small" color="error" variant="outlined"
                      onClick={() => handleCancel(booking.id)}>
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyBookings;