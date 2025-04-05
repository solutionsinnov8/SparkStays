// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Services from '../components/home/Services';
import HowItWork from '../components/home/HowItWork';
import Testimonial from '../components/home/Testimonial';
import Footer from '../components/home/Footer';
import Filter from '../components/home/Filter';

const HomePage = () => {
    return (
        <div className="bg-gray-50">

            <HeroSection />
            {/* <Filter /> */}
            <Services />
            <HowItWork />
            <Testimonial />
            <Footer />
        </div>
    );
};

export default HomePage;
