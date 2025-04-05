import React from 'react'
import { Button, Container, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
const Services = () => {
  return (
    <div>
      {/* Services Section */}
      <section className="py-5 md:py-16 bg-white">
        <Container className='flex flex-col md:gap-[30px] '>
          <Fade triggerOnce>
            <h2 className="text-2xl md:!text-4xl font-semibold text-center mb-6">Our Premium Services</h2>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Service Cards */}
            <Fade direction="up" delay={100} triggerOnce>
              <div className="bg-white p-6 rounded-lg shadow-xl border transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 h-full flex flex-col gap-2">
                <Typography variant="h6" className="text-2xl font-semibold mb-4">Birthday Celebrations</Typography>
                <Typography className="text-gray-600 mb-4">Celebrate your love with a tailored anniversary package that speaks to your heart.</Typography>
                <Link to="/booking">
                  <Button variant="outlined" color="primary" fullWidth className="transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white">Book Now</Button>
                </Link>
              </div>
            </Fade>

            <Fade direction="up" delay={200} triggerOnce>
              <div className="bg-white p-6 border rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 h-full flex flex-col gap-2">
                <Typography variant="h6" className="text-2xl font-semibold mb-4">Proposal Packages</Typography>
                <Typography className="text-gray-600 mb-4">A dream proposal made real with a romantic setup, flowers, and a personal touch.</Typography>
                <Link to="/booking">
                  <Button variant="outlined" color="primary" fullWidth className="transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white">Book Now</Button>
                </Link>
              </div>
            </Fade>

            <Fade direction="up" delay={300} triggerOnce>
              <div className="bg-white p-6 rounded-lg border shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 h-full flex flex-col gap-2">
                <Typography variant="h6" className="text-2xl font-semibold mb-4">Anniversary Special</Typography>
                <Typography className="text-gray-600 mb-4">Celebrate your love with a tailored anniversary package that speaks to your heart.</Typography>
                <Link to="/booking">
                  <Button variant="outlined" color="primary" fullWidth className="transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white">Book Now</Button>
                </Link>
              </div>
            </Fade>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Services
