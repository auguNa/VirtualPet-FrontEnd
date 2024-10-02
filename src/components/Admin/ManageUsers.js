// src/components/Admin/ManageUsers.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Auth State:', authState); // Log authState for debugging

    if (!authState || authState.role !== 'ROLE_ADMIN') {
      console.warn('User is not an admin or authState is undefined. Redirecting...');
      navigate('/user');
      return; 
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('Fetched users:', response.data); // Log the entire response
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error); // Log the error
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Pets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>
                <ul>
                  {user.virtualPets && user.virtualPets.length > 0 ? (
                    user.virtualPets.map((pet) => (
                      <li key={pet.id}>
                        {pet.name} (Type: {pet.type}, Color: {pet.color}, Mood: {pet.mood}, Energy: {pet.energy})
                      </li>
                    ))
                  ) : (
                    <li>No pets</li>
                  )}
                </ul>
              </td>
              <td>
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
