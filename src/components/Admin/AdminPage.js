/*import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.role !== 'ADMIN') {
      // Redirect if the user is not an admin
      navigate('/user');
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      }
    };

    if (authState.role === 'ADMIN') {
      fetchUsers();
    }
  }, [authState.role, navigate]);

  return (
    <div className="container">
      <h2>Admin Page</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Pets</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.pets.length > 0 ? (
                  <ul>
                    {user.pets.map((pet) => (
                      <li key={pet.id}>{pet.name} ({pet.type})</li>
                    ))}
                  </ul>
                ) : (
                  'No pets'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
*/