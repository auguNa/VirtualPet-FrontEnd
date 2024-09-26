import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './UserPage.css';

const UserPage = () => {
  const [pets, setPets] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // Redirect admin users to the admin page
    if (authState.role === 'admin') {
      navigate('/admin');
      return;
    }

    // Fetch the user's pets from the backend
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pets', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets', error);
      }
    };

    fetchPets();
  }, [authToken, authState.role, navigate]);

  const handleCreatePet = () => {
    navigate('/create-pet');
  };

  const handleDeletePet = async (petId) => {
    try {
      await axios.delete(`http://localhost:8080/api/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPets(pets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error('Error deleting pet', error);
    }
  };

  const handleAction = async (petId, action) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/pets/${petId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const updatedPet = response.data;
      setPets(pets.map((pet) => (pet.id === petId ? updatedPet : pet)));
    } catch (error) {
      console.error(`Error performing action ${action} on pet`, error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login after logging out
  };

  return (
    <div className="container">
      <h2>My Virtual Pets</h2>
      <div className="button-row">
      <button onClick={handleCreatePet}>Create New Pet</button>
      <button onClick={handleLogout}>Logout</button> 
      </div>
      <div className="pet-list">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-item">
            <h3>{pet.name}</h3>
            <p>Type: {pet.type}</p>
            <p>Color: {pet.color}</p>
            <p>Mood: {pet.mood}</p>
            <p>Energy Level: {pet.energy}</p>
            <button onClick={() => navigate(`/pets/${pet.id}`)}>Update</button>
            <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
            <button onClick={() => handleAction(pet.id, 'feed')}>Feed</button>
            <button onClick={() => handleAction(pet.id, 'play')}>Play</button>
            <button onClick={() => handleAction(pet.id, 'rest')}>Rest</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
