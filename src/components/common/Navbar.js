import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/role';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn() ? (
        <>
          <Link to="/create-pet">Create Pet</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
