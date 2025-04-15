import React, { useState, useContext, useEffect } from 'react'; 
import { AuthContext } from '../../context/AuthContext';
import {
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const { Option } = Select;

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("User from context:", user);
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.role === 'guest') {
        navigate('/dashboard');
      } else if (user.role === 'event_planner') {
        navigate('/event-planner/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (tab === 0) {
      // Login
      try {
        const res = await api.post('/auth/login', { email, password });
        const { token, user } = res.data;
  
        // Save token to localStorage or context
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
  
        // Redirect based on user role
        login(user, token);
        toast.success('Login successful!');
        if (user.role === 'guest') {
          navigate('/dashboard');
        } else if (user.role === 'event_planner') {
          navigate('/event-planner/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          toast.warn('Unknown role, but logged in!');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error(error.response?.data?.message || 'Login failed');
      }
    } else {
      // Register
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      if (!userRole || !fullName) {
        toast.error('Please fill all fields!');
        return;
      }
  
      try {
        const newUser = { fullName, email, password, role: userRole };
        await api.post('/auth/register', newUser);
        toast.success('Registered successfully! Please login.');
        setTab(0);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Registration failed!');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 relative overflow-hidden px-4">
      <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-[-10%] left-[-10%] animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-[-10%] right-[-10%] animate-pulse" />

      <div className="flex flex-col md:flex-row bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-4xl border border-white/20 z-10 mt-[80px]">
        <div className="hidden md:flex flex-col justify-center items-start pr-10 border-r border-white/20">
          <Typography variant="h4" className="text-white font-bold">
            SparkStays
          </Typography>
          <Typography variant="subtitle1" className="text-white mt-2">
            Where magical moments begin ✨
          </Typography>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="primary"
            className="mb-6"
            TabIndicatorProps={{ style: { backgroundColor: '#7e22ce' } }}
          >
            <Tab label="Login" className="w-1/2 font-semibold" />
            <Tab label="Register" className="w-1/2 font-semibold" />
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-5">
            {tab === 1 && (
              <>
                <TextField
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  InputProps={{
                    className: 'bg-white/90 rounded-md',
                  }}
                />
                <div className="bg-white/90 rounded-lg">
                  <Select
                    placeholder="Select User Type"
                    value={userRole}
                    onChange={(value) => setUserRole(value)}
                    style={{ width: '100%' }}
                    className='!h-[55px]'
                    size="large"
                  >
                    <Option value="guest">Guest</Option>
                    <Option value="event_planner">Event Planner</Option>
                  </Select>
                </div>
              </>
            )}

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                className: 'bg-white/90 rounded-md',
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                className: 'bg-white/90 rounded-md',
              }}
            />
            {tab === 1 && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  className: 'bg-white/90 rounded-md',
                }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-md font-semibold shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              {tab === 0 ? 'Login' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
