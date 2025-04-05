import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white py-8">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <Typography variant="body1">
              &copy; 2025 Spark Booking. All Rights Reserved.
            </Typography>
            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Instagram
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
