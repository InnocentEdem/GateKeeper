import React from 'react';
import { Box, CssBaseline } from '@mui/material';

const SwaggerUI: React.FC = () => {
  return (
    <Box sx={{ width: 1200, margin: '0 auto', padding: 2 }}>
      <CssBaseline />

      <Box sx={{ width: '80rem', height: '80vh', border: 'none', mt: 4 }}>
        <iframe
          src="http://localhost:4000/swagger/index.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Swagger UI"
        />
      </Box>
    </Box>
  );
};

export default SwaggerUI;


