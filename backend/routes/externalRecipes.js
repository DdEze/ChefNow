const express = require('express');
const router = express.Router();
const { searchRecipes, getRecipeById } = require('../controllers/externalRecipesController');

router.get('/recipes', searchRecipes);
router.get('/recipe/:id', getRecipeById);

module.exports = router;
