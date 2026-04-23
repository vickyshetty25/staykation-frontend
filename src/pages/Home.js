import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container,
  Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?location=${location}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#FF5A5F', color: 'white', py: 10,
        textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Find Your Perfect Stay
          </Typography>
          <Typography variant="h6" mb={4}>
            Discover unique homes, apartments and villas worldwide
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center',
            maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Where do you want to go?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button variant="contained" size="large"
              onClick={handleSearch}
              sx={{ bgcolor: '#333', px: 4 }}
              startIcon={<SearchIcon />}>
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}
          textAlign="center">
          Why Choose Staykation?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: 'Unique Stays', desc: 'Find one-of-a-kind properties' },
            { title: 'Secure Booking', desc: 'Safe and easy payment' },
            { title: 'Host Support', desc: 'List your property easily' },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={3} sx={{ textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;