// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create Provider Component
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null, 
  });

  const login = (user, role) => {
    setAuthState({ isAuthenticated: true, user, role });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null, role: null });
    localStorage.removeItem('authToken');
  };

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You might need to fetch the user and role info here or during login
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token to get user info
      setAuthState({ isAuthenticated: true, user: decodedToken.sub, role: decodedToken.role });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
