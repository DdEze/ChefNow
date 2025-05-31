const axios = require('axios');

const searchRecipes = async (req, res) => {
  const { q, category, area, ingredient } = req.query;

  let url;

  if (q) {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`;
  } else if (category) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  } else if (area) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  } else if (ingredient) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  } else {
    return res.status(400).json({ message: 'Debes proveer al menos un parámetro de búsqueda' });
  }

  try {
    const response = await axios.get(url);
    const data = response.data.meals || [];

    res.json({ meals: data });
  } catch (error) {
    res.status(500).json({ message: 'Error buscando recetas', error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const meal = response.data.meals ? response.data.meals[0] : null;

    if (!meal) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.json({ meals: [meal] });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener receta', error: error.message });
  }
};

module.exports = { searchRecipes, getRecipeById };
