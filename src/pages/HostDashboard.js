import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent,
  CardMedia, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMyProperties, deleteProperty } from '../services/api';
import AddIcon from '@mui/icons-material/Add';

const HostDashboard = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyProperties().then(res => setProperties(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteProperty(id);
    getMyProperties().then(res => setProperties(res.data));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          My Properties
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}
          sx={{ bgcolor: '#FF5A5F' }}
          onClick={() => navigate('/host/create-property')}>
          Add Property
        </Button>
      </Box>

      {properties.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" mt={4}>
          No properties listed yet. Add your first property!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map(p => (
            <Grid item xs={12} md={6} key={p.id}>
              <Card>
                <CardMedia component="img" height="140"
                  image={p.images?.[0]?.imageUrl ||
                    'https://via.placeholder.com/400x140?text=No+Image'}
                  alt={p.title} />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">
                      {p.title}
                    </Typography>
                    <Chip label={p.status} size="small"
                      color={p.status === 'ACTIVE' ? 'success' : 'error'} />
                  </Box>
                  <Typography color="text.secondary">{p.location}</Typography>
                  <Typography fontWeight="bold" color="#FF5A5F">
                    ₹{p.basePrice}/night
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button size="small" variant="outlined"
                      onClick={() => navigate(`/properties/${p.id}`)}>
                      View
                    </Button>
                    <Button size="small" variant="outlined" color="error"
                      onClick={() => handleDelete(p.id)}>
                      Deactivate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HostDashboard;