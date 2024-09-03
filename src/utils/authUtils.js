// src/utils/authUtils.js

export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };
  
  export const hasRole = (role) => {
    const roles = JSON.parse(localStorage.getItem('userRoles'));
    return roles && roles.includes(role);
  };
  