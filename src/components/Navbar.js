import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HotelIcon from '@mui/icons-material/Hotel';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#FF5A5F' }}>
      <Toolbar>
        <HotelIcon sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer',
          fontWeight: 'bold' }}
          onClick={() => navigate('/')}>
          Staykation
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/search')}>
            Search
          </Button>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/my-bookings')}>
                My Bookings
              </Button>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              {(user.role === 'HOST' || user.role === 'ADMIN') && (
                <Button color="inherit"
                  onClick={() => navigate('/host/dashboard')}>
                  Host Dashboard
                </Button>
              )}
              {user.role === 'ADMIN' && (
                <Button color="inherit" onClick={() => navigate('/admin')}>
                  Admin
                </Button>
              )}
              <Button color="inherit" variant="outlined"
                onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" variant="outlined"
                onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;