const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.createUser); // Register a new user
router.post('/login', userController.loginUser);     // Login user (if needed, you can implement this in the controller)

// Protected routes (need to be logged in)
router.use(authMiddleware.verifyToken); // Apply authentication middleware to all routes below

router.get('/', userController.getAllUsers);     // Get all users
router.get('/:id', userController.getUserById);  // Get a specific user by ID
router.put('/:id', userController.updateUser);   // Update a user by ID
router.delete('/:id', userController.deleteUser); // Delete a user by ID

module.exports = router;
