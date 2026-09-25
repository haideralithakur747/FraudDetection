const express = require('express');

const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Protected profile
router.get('/profile', authenticateToken, authController.profile);

module.exports = router;