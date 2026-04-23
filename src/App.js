import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import PropertyDetail from './pages/PropertyDetail';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import HostDashboard from './pages/HostDashboard';
import CreateProperty from './pages/CreateProperty';
import AdminDashboard from './pages/AdminDashboard';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <Box display="flex" justifyContent="center" mt={10}>
      <CircularProgress />
    </Box>
  );
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/booking/:propertyId" element={
            <ProtectedRoute><Booking /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute><MyBookings /></ProtectedRoute>
          } />
          <Route path="/host/dashboard" element={
            <ProtectedRoute roles={['HOST', 'ADMIN']}>
              <HostDashboard />
            </ProtectedRoute>
          } />
          <Route path="/host/create-property" element={
            <ProtectedRoute roles={['HOST', 'ADMIN']}>
              <CreateProperty />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;