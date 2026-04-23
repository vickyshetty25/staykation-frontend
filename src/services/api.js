import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Auto-attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

// Properties
export const searchProperties = (params) =>
  api.get('/properties/search', { params });
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (data) => api.post('/properties', data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);
export const getMyProperties = () => api.get('/properties/my-properties');
export const uploadImage = (propertyId, formData) =>
  api.post(`/images/property/${propertyId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/my-bookings');
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Reviews
export const createReview = (data) => api.post('/reviews', data);
export const getPropertyReviews = (propertyId) =>
  api.get(`/reviews/property/${propertyId}`);

// User
export const getProfile = () => api.get('/users/me');
export const updateProfile = (data) => api.put('/users/me', data);
export const becomeHost = () => api.put('/users/become-host');

// Admin
export const getAnalytics = () => api.get('/admin/analytics');

export default api;