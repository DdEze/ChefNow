import { api } from './api';

export const fetchRecipes = (params) => {
  return api.get('/external/recipes', { params });
};
