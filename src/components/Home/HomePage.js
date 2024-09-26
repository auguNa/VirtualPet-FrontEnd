// src/components/Home/HomePage.js

import React from 'react';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="fade-in" style={{ animationDelay: '1s' }}>Welcome to the Virtual Pet </h1>
<p className="fade-in" style={{ animationDelay: '1.5s' }}>Please Login or Register.</p>

    </div>
  );
};

export default HomePage;