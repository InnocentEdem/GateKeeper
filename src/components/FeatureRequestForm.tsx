import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../appConfig/axiosConfig';

const FeatureRequestForm = () => {
  const [feature, setFeature] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/feature-request",{feature_name: feature, feature_description: description})
    } catch (error) {
      console.error('error sending request')
    }
    setSubmitted(true);
    console.log({ feature, description, email });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Request a Feature
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Feature Title"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
        />
        <TextField
          label="Feature Description"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </Box>
      {submitted && (
        <Typography variant="body1" color="success" sx={{ mt: 3 }}>
          Thank you for your feature request!
        </Typography>
      )}
    </Container>
  );
};

export default FeatureRequestForm;
