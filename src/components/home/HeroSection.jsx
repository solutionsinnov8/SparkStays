import React from 'react'
import { Button, Container, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import Navbar from './Navbar';
const HeroSection = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />

      {/* Hero Section with Background Image and Content */}
      <section className="h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(images/home.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-full gap-3">
          <Fade direction="up" triggerOnce>
            <Typography variant="h2" className="!text-3xl md:!text-6xl font-extrabold mb-6">Create Memories That Last Forever</Typography>
          </Fade>
          <Fade direction="up" delay={100} triggerOnce>
            <Typography variant="h5" className="mb-8 max-w-xl mx-auto !text-lg  md:!text-2xl">
              Explore exclusive packages designed to make your special moments unforgettable. From intimate proposals to extravagant birthday parties, we've got it all covered!
            </Typography>
          </Fade>
          <Fade direction="up" delay={200} triggerOnce>
            <Link to="/packages">
              <Button variant="contained" color="primary" size="large" className="transition-all duration-300 ease-in-out hover:bg-blue-700 transform hover:scale-105">Explore Packages</Button>
            </Link>
          </Fade>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
