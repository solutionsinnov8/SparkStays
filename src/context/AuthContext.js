// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
      setLoading(false);
    }, []);
  
    const login = (user, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setToken(token);
    };
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
    };
    const updateUser = (updatedData) => {
      const newUser = { ...user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    };
    
    return (
      <AuthContext.Provider value={{ user, token, login, logout, loading, updateUser  }}>
        {children}
      </AuthContext.Provider>
    );
  };
  