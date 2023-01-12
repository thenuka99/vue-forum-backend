const app = require('express');
const router = app.Router();

// Auth controller
const authController = require('../controller/Auth_Controller');

// Signup route
router.post('/signup', authController.signUp);

// Login
router.post('/login', authController.login);

// get User Details
router.get('/details', authController.getUserDetails);

module.exports = router;