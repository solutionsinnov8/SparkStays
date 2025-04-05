// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard.jsx'; // User Dashboard
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute for role-based access
import BookingPage from './pages/BookingPage.jsx';

const App = () => {
  const [userRole, setUserRole] = useState('guest'); // 'guest', 'user', 'admin'

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              allowedRoles={['user', 'admin']}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedRoles={['admin']}
              userRole={userRole}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
