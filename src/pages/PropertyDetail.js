import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Box, Chip,
  Divider, Card, CardContent, Rating } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty, getPropertyReviews } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProperty(id).then(res => {
      setProperty(res.data.property);
      setAvgRating(res.data.averageRating);
    });
    getPropertyReviews(id).then(res => setReviews(res.data));
  }, [id]);

  if (!property) return <Typography mt={4} textAlign="center">
    Loading...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        {property.title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Rating value={avgRating} precision={0.5} readOnly />
        <Typography>({reviews.length} reviews)</Typography>
        <Typography color="text.secondary">• {property.location}</Typography>
      </Box>

      {/* Images */}
      <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: 2, mb: 3,
        height: 300, display: 'flex', alignItems: 'center',
        justifyContent: 'center' }}>
        {property.images?.length > 0 ? (
          <img src={property.images[0].imageUrl} alt={property.title}
            style={{ maxHeight: '100%', borderRadius: 8 }} />
        ) : (
          <Typography color="text.secondary">No images available</Typography>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Details */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={property.propertyType} />
            <Chip label={`${property.maxGuests} guests`} />
            <Chip label={`${property.bedrooms} bedrooms`} />
            <Chip label={`${property.bathrooms} bathrooms`} />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Description
          </Typography>
          <Typography color="text.secondary" mb={3}>
            {property.description}
          </Typography>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Amenities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                {property.amenities.map((a, i) => (
                  <Chip key={i} label={a.name} variant="outlined" />
                ))}
              </Box>
            </>
          )}

          {/* Reviews */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            reviews.map(review => (
              <Card key={review.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography>{review.comment}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {review.guest?.name}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        {/* Booking Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h5" fontWeight="bold" color="#FF5A5F">
              ₹{property.basePrice}
              <Typography component="span" variant="body1"
                color="text.secondary"> /night</Typography>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button fullWidth variant="contained"
              sx={{ bgcolor: '#FF5A5F', py: 1.5 }}
              onClick={() => user
                ? navigate(`/booking/${property.id}`)
                : navigate('/login')}>
              {user ? 'Book Now' : 'Login to Book'}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetail;