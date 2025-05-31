import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const token = () => localStorage.getItem('token');

export const toggleFavorite = async (recipeId) => {
  const res = await axios.post(`${API_URL}/recipes/${recipeId}/favorite`, {}, {
    headers: { Authorization: `Bearer ${token()}` }
  });
  return res.data;
};

export const getFavorites = async () => {
  const res = await axios.get(`${API_URL}/users/me/favorites`, {
    headers: { Authorization: `Bearer ${token()}` }
  });
  return res.data;
};
