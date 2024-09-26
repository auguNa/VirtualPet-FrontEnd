// src/components/Admin/AdminDashboard.js

import React, { useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    logout(); 
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="button-row">
        <button onClick={() => navigate('/admin/users')}>Manage Users</button>
        <button onClick={() => navigate('/admin/pets')}>Get All Pets</button>
                <button onClick={handleLogout}>Logout</button>
      </div>
      <Outlet /> 
    </div>
  );
};

export default AdminDashboard;
