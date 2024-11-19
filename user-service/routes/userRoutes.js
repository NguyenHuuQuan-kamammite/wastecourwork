const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




// Test route to check if the user routes are working
router.get('/test', (req, res) => {
    res.send("User route is working!");
});

// Route to display the registration page (GET)
router.get('/register', (req, res) => {
    res.send("Register page"); 
});

// Route to display the login page (GET)
router.get('/login', (req, res) => {
    res.send("Login page");
});

// Public routes
router.post('/register', userController.createUser); // Register a new user
router.post('/login', userController.loginUser);     // Login user (implement this in the controller)



router.get('/all', userController.getAllUsers);     // Get all users
router.get('/:id', userController.getUserById);  // Get a specific user by ID
router.put('/:id', userController.updateUser);   // Update a user by ID
router.delete('/:id', userController.deleteUser); // Delete a user by ID

module.exports = router;
