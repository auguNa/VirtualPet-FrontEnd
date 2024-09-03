// src/components/Admin/EditUser.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminPage.css';


const EditUser = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUsername(response.data.username);
      } catch (err) {
        setError('Failed to fetch user details');
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/admin/users/${userId}`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      navigate('/admin/users');
    } catch (err) {
      setError('Failed to update user');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdateUser}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
