// src/components/Admin/AdminDashboard.js

import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <button
            onClick={() => {
              console.log('Navigating to Manage Users');
              navigate('/admin/users');
            }}
          >
            Manage Users
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              console.log('Navigating to Get All Pets');
              navigate('/admin/pets');
            }}
          >
            Get All Pets
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              console.log('Navigating to Admin Settings');
              navigate('/admin/settings');
            }}
          >
            Admin Settings
          </button>
        </li>
      </ul>
      <Outlet /> {/* This is where nested routes will render */}
    </div>
  );
};

export default AdminDashboard;
