const Recipe = require('../models/Recipe');

const createRecipe = async (req, res) => {
  const { title, category, area, ingredients, instructions, video } = req.body;
  const image = req.file ? req.file.path : req.body.image || '';

  try {
    const recipe = new Recipe({
      title,
      category,
      area,
      ingredients,
      instructions,
      image,
      video,
      author: req.user.id,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear receta', error: err.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username name');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener recetas', error: err.message });
  }
};

const getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tus recetas', error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username name');
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener receta', error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado para editar esta receta' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar receta', error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receta no encontrada' });

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta receta' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receta eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar receta', error: err.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
