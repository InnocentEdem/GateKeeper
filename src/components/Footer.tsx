import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        zIndex:"1000"
      }}
    >
      <Box width="100vw">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          TechNocent {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
