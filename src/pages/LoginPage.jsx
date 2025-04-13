// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import Login from '../components/login/Login';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock user data based on email and password
    const user = { email, password, role: 'user' }; // Default role set to 'user'

    // Check user role and navigate accordingly
    if (user.role === 'user') {
      navigate('/dashboard'); // Redirect user to their dashboard
    } else if (user.role === 'admin') {
      navigate('/admin/dashboard'); // Redirect admin to admin dashboard
    }
  };

  return (
   <div>
    <Login />
    <Footer />
   </div>
  );
};

export default LoginPage;
