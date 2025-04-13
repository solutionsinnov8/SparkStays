// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);
  
    const login = (user, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    };
  
    return (
      <AuthContext.Provider value={{ user, setUser, login, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  