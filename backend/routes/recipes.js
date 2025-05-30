const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipesController');

router.get('/', getAllRecipes);
router.get('/mine', auth, getUserRecipes);
router.get('/:id', getRecipeById);
router.post('/', auth, createRecipe);
router.put('/:id', auth, updateRecipe);
router.delete('/:id', auth, deleteRecipe);

module.exports = router;
