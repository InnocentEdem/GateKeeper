import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axiosInstance from '../appConfig/axiosConfig';

interface FeatureRequest {
  title: string;
  feature: string;
}
const emptyRequest = {
  title: "",
  feature: "",
}
const FeatureRequestForm = () => {
  const [featureRequest, setFeatureRequest] = useState<FeatureRequest>({...emptyRequest})
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
    setFeatureRequest({...featureRequest, [event.target.name]: event.target.value})
  }

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/feature-request", {...featureRequest})
    } catch (error) {
      console.error('error sending request')
    }
    setSubmitted(true);
    setFeatureRequest({...emptyRequest})
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
          name='title'
          value={featureRequest.title}
          onChange={handleChange}
        />
        <TextField
          label="Feature Description"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
          name='feature'
          value={featureRequest.feature}
          onChange={handleChange}
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
          Thank you ! Your feedback valuable to us.
        </Typography>
      )}
    </Container>
  );
};

export default FeatureRequestForm;
