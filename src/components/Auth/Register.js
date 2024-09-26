import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password,
        roles: ["ROLE_USER"], // Include roles for registration
      });

      // On successful registration, display success message
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    } catch (error) {
      // Handle specific user already exists error
      if (error.response && error.response.status === 409) {
        setError('Username already exists. Please choose a different one.');
      } else if (error.response) {
        // Generic error from the backend
        setError(error.response.data);
      } else {
        // Other errors, like network issues
        setError('Registration failed. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {/* Display error or success messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
