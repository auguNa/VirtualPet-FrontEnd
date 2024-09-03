import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetCreate = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState(''); 
  const [color, setColor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreatePet = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('You must be logged in to create a pet');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/pets/create',
        {
          name,
          type, 
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201 || 200) {
        setSuccess('Pet created successfully!');
        setName('');
        setType(''); 
        setColor('');
        navigate('/user'); // Redirect to the /user page after successful creation
      } else {
        setError('Failed to create pet');
      }
    } catch (error) {
      setError(`Error: ${error.response ? error.response.data : error.message}`);
      console.error('Create pet failed', error);
    }
  };

  return (
    <div className="container">
      <h2>Create a New Pet</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleCreatePet}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
};

export default PetCreate;
