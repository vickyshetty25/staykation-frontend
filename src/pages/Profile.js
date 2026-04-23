import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button,
  Card, Alert, Divider } from '@mui/material';
import { getProfile, updateProfile, becomeHost } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getProfile().then(res => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Update failed');
    }
  };

  const handleBecomeHost = async () => {
    try {
      await becomeHost();
      setSuccess('You are now a host! Please log in again to access host features.');
    } catch (err) {
      setError('Failed to become host');
    }
  };

  if (!profile) return <Typography mt={4} textAlign="center">
    Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>My Profile</Typography>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ width: 60, height: 60, borderRadius: '50%',
            bgcolor: '#FF5A5F', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontSize: 24,
            fontWeight: 'bold' }}>
            {profile.name?.[0]?.toUpperCase()}
          </Box>
          <Box>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography color="text.secondary">{profile.role}</Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <TextField fullWidth label="Name" margin="normal"
          value={form.name || ''}
          onChange={e => setForm({...form, name: e.target.value})} />
        <TextField fullWidth label="Contact Number" margin="normal"
          value={form.contactNumber || ''}
          onChange={e => setForm({...form,
            contactNumber: e.target.value})} />
        <TextField fullWidth label="Bank Name" margin="normal"
          value={form.bankName || ''}
          onChange={e => setForm({...form, bankName: e.target.value})} />
        <TextField fullWidth label="Bank Account Number" margin="normal"
          value={form.bankAccountNumber || ''}
          onChange={e => setForm({...form,
            bankAccountNumber: e.target.value})} />
        <TextField fullWidth label="IFSC Code" margin="normal"
          value={form.ifscCode || ''}
          onChange={e => setForm({...form, ifscCode: e.target.value})} />
        <Button fullWidth variant="contained"
          sx={{ mt: 2, bgcolor: '#FF5A5F' }}
          onClick={handleUpdate}>
          Update Profile
        </Button>

        {profile.role === 'GUEST' && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" mb={1}>Become a Host</Typography>
            <Typography color="text.secondary" mb={2}>
              List your property and start earning today!
            </Typography>
            <Button fullWidth variant="outlined" color="warning"
              onClick={handleBecomeHost}>
              Become a Host
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Profile;