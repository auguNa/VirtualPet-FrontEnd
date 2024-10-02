// src/components/Auth/Login.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      const authToken = response.data; // Assuming the token is returned as plain text
      console.log('Token received:', authToken);

      if (authToken) {
        localStorage.setItem('authToken', authToken);
        
        // Decode the token to get user roles
        const decodedToken = JSON.parse(atob(authToken.split('.')[1])); 
        console.log('Decoded token:', decodedToken);
        const userRoles = decodedToken.roles || []; 

        const userRole = userRoles.length > 0 ? userRoles[0] : undefined;

        login({ username }, userRole); // Update context with user info and role

        // Redirect based on role
        if (userRole === 'ROLE_ADMIN') {
          navigate('/admin'); // Redirect to the admin page
        } else if (userRole === 'ROLE_USER') {
          navigate('/user'); // Redirect to the user page
        } else {
          navigate('/user'); // Redirect to the homepage or another default page if role is not recognized
        }
      } else {
        setError('Login failed: No token received');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
             name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
