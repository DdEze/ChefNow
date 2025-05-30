const express = require('express');
const router = express.Router();
const { searchRecipes } = require('../controllers/externalRecipesController');

router.get('/search', searchRecipes);

module.exports = router;
