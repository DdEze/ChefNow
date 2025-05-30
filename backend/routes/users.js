const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/usersController');
const auth = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);

module.exports = router;
