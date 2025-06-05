const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, deleteUser, getUserById, changePassword } = require('../controllers/usersController');
const auth = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getProfile);
router.delete('/delete', auth, deleteUser);
router.get('/:id', auth, getUserById);
router.post('/change-password', auth, changePassword);


module.exports = router;
