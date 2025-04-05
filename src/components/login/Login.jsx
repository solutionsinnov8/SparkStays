import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tab === 0) {
      const user = { email, password, role: 'user' };
      navigate(user.role === 'user' ? '/dashboard' : '/admin/dashboard');
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!userRole || !fullName) {
        alert('Please fill all fields!');
        return;
      }
      const newUser = { fullName, email, password, userRole };
      console.log('Registering:', newUser);
      alert('Registered successfully!');
      setTab(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 relative overflow-hidden px-4">
      {/* Decorative shapes */}
      <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-[-10%] left-[-10%] animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-[-10%] right-[-10%] animate-pulse" />

      <div className="flex flex-col md:flex-row bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-4xl border border-white/20 z-10 mt-[80px]">
        {/* Branding Panel */}
        <div className="hidden md:flex flex-col justify-center items-start pr-10 border-r border-white/20">
          <Typography variant="h4" className="text-white font-bold">
            SparkStays
          </Typography>
          <Typography variant="subtitle1" className="text-white mt-2">
            Where magical moments begin ✨
          </Typography>
        </div>

        {/* Form Panel */}
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

                {/* Ant Design Select */}
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
