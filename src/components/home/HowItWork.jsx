import React from 'react'
import { Button, Container, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
const HowItWork = () => {
  return (
    <div>
          {/* How it Works Section */}
          <section className="py-5 md:py-16 bg-gray-100">
        <Container className='flex flex-col md:gap-[30px]'>
          <Fade triggerOnce>
            <h2 className="text-2xl md:!text-4xl font-semibold text-center mb-6">How It Works</h2>
          </Fade>
          <div className="flex flex-col md:flex-row justify-around text-center space-y-8 md:space-y-0 md:space-x-8">
            <Fade direction="up" delay={100} triggerOnce>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4">
                  <Typography className="text-2xl font-bold">1</Typography>
                </div>
                <Typography variant="h6" className="font-semibold mb-4">Choose Your Package</Typography>
                <Typography className="text-gray-600">Select from a variety of customized packages to fit your occasion.</Typography>
              </div>
            </Fade>

            <Fade direction="up" delay={200} triggerOnce>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4">
                  <Typography className="text-2xl font-bold">2</Typography>
                </div>
                <Typography variant="h6" className="font-semibold mb-4">Select Your Date</Typography>
                <Typography className="text-gray-600">Choose the date for your event and make a booking with ease.</Typography>
              </div>
            </Fade>

            <Fade direction="up" delay={300} triggerOnce>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4">
                  <Typography className="text-2xl font-bold">3</Typography>
                </div>
                <Typography variant="h6" className="font-semibold mb-4">Enjoy Your Event</Typography>
                <Typography className="text-gray-600">Relax and enjoy your perfectly planned and executed event.</Typography>
              </div>
            </Fade>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default HowItWork
