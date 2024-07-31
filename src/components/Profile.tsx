import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const user = useAuth()?.currentUser;


  return (
    <Box sx={{ maxWidth: 800, margin: '5rem auto auto auto', padding: 2, textAlign:"left" }}>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Email:</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h6">{user?.email}</Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Name:</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h6">
            {user?.firstname} {user?.lastname}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Last Login:</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="h6">{'date'}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
