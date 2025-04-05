import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const Testimonial = () => {
  return (
    <div>
      {/* Testimonials Section */}
      <section className="py-5 md:py-16 bg-white">
        <Container className="flex flex-col md:gap-8">
          <Fade triggerOnce>
            <h2
              className="text-2xl md:!text-4xl font-semibold text-center md:mb-6"
            >
              What Our Clients Say
            </h2>
          </Fade>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
            {/* Testimonial 1 */}
            <Fade direction="up" delay={100} triggerOnce>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg w-full md:max-w-xs text-center">
                <Typography variant="body1" className="italic mb-4">
                  "The proposal package was beyond our expectations. My partner was so surprised, and the event was so romantic!"
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  Sarah & James
                </Typography>
              </div>
            </Fade>

            {/* Testimonial 2 */}
            <Fade direction="up" delay={200} triggerOnce>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg w-full md:max-w-xs text-center">
                <Typography variant="body1" className="italic mb-4">
                  "Our anniversary celebration was flawless. Everything was taken care of, and the memories will last forever."
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  Rachel & Tom
                </Typography>
              </div>
            </Fade>

            {/* Testimonial 3 */}
            <Fade direction="up" delay={300} triggerOnce>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-lg w-full md:max-w-xs text-center">
                <Typography variant="body1" className="italic mb-4">
                  "I can't believe how smooth and special the whole process was. Highly recommended!"
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  Ayesha & Amir
                </Typography>
              </div>
            </Fade>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Testimonial;
