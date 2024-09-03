// src/services/petService.js
import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: '/api/pets',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getPets = () => api.get('/');
export const getPet = (id) => api.get(`/${id}`);
export const createPet = (data) => api.post('/', data);
export const updatePet = (id, data) => api.put(`/${id}`, data);
export const deletePet = (id) => api.delete(`/${id}`);