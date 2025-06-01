const express = require('express');
const {registerUser, loginUser, getUserProfile} = require('../controllers/authController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

// Auth Routes
router.post('/register', registerUser);   // Register a new user
router.post('/login', loginUser);         // Login user
router.get('/profile', protect, getUserProfile); // Get user profile (protected route)

module.exports = router;