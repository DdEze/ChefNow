import { recipeAPI } from './api';

export const fetchRecipes = (params) => {
  return recipeAPI.get('/recipes', { params });
};
