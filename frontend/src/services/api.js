import axios from 'axios';

export const userAPI = axios.create({
  baseURL: 'http://localhost:5000/api/users'
});

export const recipeAPI = axios.create({
  baseURL: 'http://localhost:5000/api/external'
});

export const recipelAPI = axios.create({
  baseURL: 'http://localhost:5000/api'
});
