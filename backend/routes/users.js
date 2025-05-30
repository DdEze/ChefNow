const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, deleteUser } = require('../controllers/usersController');
const auth = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);
router.delete('/delete', auth, deleteUser);


module.exports = router;
