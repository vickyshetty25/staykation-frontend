import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia,
  Typography, TextField, Button, Box, MenuItem,
  Slider } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchProperties } from '../services/api';

const SearchResults = () => {
  const [params] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: params.get('location') || '',
    minPrice: '', maxPrice: '',
    propertyType: '', guests: ''
  });
  const navigate = useNavigate();

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    try {
      const res = await searchProperties(
        Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        )
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Search Properties
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField label="Location" size="small"
          value={filters.location}
          onChange={e => setFilters({...filters, location: e.target.value})}
        />
        <TextField label="Min Price" size="small" type="number"
          value={filters.minPrice}
          onChange={e => setFilters({...filters, minPrice: e.target.value})}
        />
        <TextField label="Max Price" size="small" type="number"
          value={filters.maxPrice}
          onChange={e => setFilters({...filters, maxPrice: e.target.value})}
        />
        <TextField select label="Type" size="small" sx={{ minWidth: 120 }}
          value={filters.propertyType}
          onChange={e => setFilters({...filters,
            propertyType: e.target.value})}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="APARTMENT">Apartment</MenuItem>
          <MenuItem value="HOUSE">House</MenuItem>
          <MenuItem value="VILLA">Villa</MenuItem>
          <MenuItem value="ROOM">Room</MenuItem>
        </TextField>
        <TextField label="Guests" size="small" type="number"
          value={filters.guests}
          onChange={e => setFilters({...filters, guests: e.target.value})}
        />
        <Button variant="contained" onClick={fetchProperties}
          sx={{ bgcolor: '#FF5A5F' }}>
          Search
        </Button>
      </Box>

      {/* Results */}
      {properties.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" mt={4}>
          No properties found. Try different filters.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 8 } }}
                onClick={() => navigate(`/properties/${property.id}`)}>
                <CardMedia
                  component="img" height="180"
                  image={property.images?.[0]?.imageUrl ||
                    'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={property.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {property.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {property.location}
                  </Typography>
                  <Typography fontWeight="bold" color="#FF5A5F" mt={1}>
                    ₹{property.basePrice}/night
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.propertyType} • {property.maxGuests} guests
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SearchResults;