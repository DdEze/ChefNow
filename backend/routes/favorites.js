const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');

router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getFavorites);
router.delete('/:mealId', verifyToken, removeFavorite); 

module.exports = router;
