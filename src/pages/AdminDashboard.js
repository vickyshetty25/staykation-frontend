import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent,
  Box } from '@mui/material';
import { getAnalytics } from '../services/api';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import StarIcon from '@mui/icons-material/Star';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ bgcolor: color, color: 'white' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" fontWeight="bold">{value}</Typography>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box sx={{ fontSize: 60, opacity: 0.8 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAnalytics().then(res => setAnalytics(res.data));
  }, []);

  if (!analytics) return <Typography mt={4} textAlign="center">
    Loading...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value={analytics.totalUsers}
            icon={<PeopleIcon fontSize="inherit" />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Properties" value={analytics.totalProperties}
            icon={<HomeIcon fontSize="inherit" />} color="#388e3c" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Bookings" value={analytics.totalBookings}
            icon={<BookOnlineIcon fontSize="inherit" />} color="#f57c00" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Reviews" value={analytics.totalReviews}
            icon={<StarIcon fontSize="inherit" />} color="#FF5A5F" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;