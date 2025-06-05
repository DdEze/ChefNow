const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  addFavorite,
  getFavorites,
  removeFavorite,
  isRecipeFavorited
} = require('../controllers/favoritesController');

router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getFavorites);
router.get('/:mealId', verifyToken, isRecipeFavorited);
router.delete('/:mealId', verifyToken, removeFavorite);

module.exports = router;
