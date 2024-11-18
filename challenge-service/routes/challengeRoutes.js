const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
// const authMiddleware = require('../middlewares/authMiddleware');

// Test route to check if the challenge routes are working
router.get('/test', (req, res) => {
    res.send("Challenge route is working!");
});

// Public routes
router.post('/', challengeController.createChallenge);  // Create a new challenge
router.get('/', challengeController.getAllChallenges);  // Get all challenges

// Protected routes (require authentication)
// router.use(authMiddleware.verifyToken);  // All following routes require authentication

router.get('/:id', challengeController.getChallengeById);  // Get a challenge by ID
router.put('/:id', challengeController.updateChallenge);   // Update a challenge by ID
router.delete('/:id', challengeController.deleteChallenge); // Delete a challenge by ID

module.exports = router;