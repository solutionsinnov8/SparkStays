// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/home/Navbar';

import EventPlannerLayout from './components/event-planner/EventPlannerLayout';
import EventPlannerDashboard from './pages/EventPlannerDashboard'
import CreatePackage from './components/event-planner/CreatePackage';
import Packages from './components/event-planner/Packages';
import Settings from './components/event-planner/Settings';

import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* All event-planner routes with sidebar layout */}
          <Route
            path="/event-planner"
            element={
              <PrivateRoute allowedRoles={['event_planner']}>
                <EventPlannerLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<EventPlannerDashboard />} />
            <Route path="create-package" element={<CreatePackage />} />
            <Route path="packages" element={<Packages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
};

export default App;
