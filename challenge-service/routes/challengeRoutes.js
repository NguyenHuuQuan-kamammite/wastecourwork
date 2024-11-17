const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// Route to create a new challenge
router.post('/', challengeController.createChallenge);

// Route to get a single challenge by ID
router.get('/:id', challengeController.getChallengeById);

// Route to get all challenges
router.get('/', challengeController.getAllChallenges);

// Route to update a challenge by ID
router.put('/:id', challengeController.updateChallenge);

// Route to delete a challenge by ID
router.delete('/:id', challengeController.deleteChallenge);

module.exports = router;
