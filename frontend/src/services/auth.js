import { userAPI } from './api';

export const login = async (email, password) => {
  const res = await userAPI.post('/login', { email, password });
  return res.data;
};

export const register = async (name, surname, email, password) => {
  const res = await userAPI.post('/register', {
    name,
    surname,
    email,
    password,
  });
  return res.data;
};

