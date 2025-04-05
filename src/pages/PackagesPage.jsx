// src/pages/PackagesPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const PackagesPage = () => {
  return (
    <Container className="py-16">
      <Typography variant="h4" className="text-center text-3xl font-bold mb-8">Our Packages</Typography>
      <Typography variant="h6" className="text-center text-lg">Choose the best package for your event</Typography>
      {/* Add package details here */}
    </Container>
  );
};

export default PackagesPage;
