import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { FiMenu, FiX } from 'react-icons/fi'; // Using react-icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 text-white fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-1">
          <Typography variant="h4" className="font-extrabold !text-2xl md:!text-4xl ">
            <span className="text-white logo">Spark</span>
            <span className="!text-yellow-300 logo">Stays</span>
          </Typography>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/booking" className="hover:text-gray-200 transition">Book Now</Link>
          <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800 px-4 pb-4 space-y-2 text-lg font-semibold">
          <Link to="/" onClick={toggleMobileMenu} className="block hover:text-gray-200">Home</Link>
          <Link to="/booking" onClick={toggleMobileMenu} className="block hover:text-gray-200">Book Now</Link>
          <Link to="/login" onClick={toggleMobileMenu} className="block hover:text-gray-200">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
