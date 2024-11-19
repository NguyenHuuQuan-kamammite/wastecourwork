const ChallengeModel = require('../models/challengeModel');

class ChallengeController {
    // Create a new challenge
    async createChallenge(req, res) {
        try {
            const { description, difficulty, scoring } = req.body;

            // Validate input
            if (!description || !difficulty || !scoring) {
                return res.status(400).json({ message: 'All fields (description, difficulty, scoring) are required' });
            }

            const challenge = await ChallengeModel.create({ description, difficulty, scoring });
            res.status(201).json({ message: 'Challenge created successfully', challenge });
        } catch (error) {
            console.error('Error creating challenge:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get a single challenge by ID
    async getChallengeById(req, res) {
        try {
            const challenge = await ChallengeModel.findById(req.params.id);
            if (!challenge) {
                return res.status(404).json({ message: 'Challenge not found' });
            }
            res.status(200).json(challenge);
        } catch (error) {
            console.error('Error fetching challenge:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get all challenges
    async getAllChallenges(req, res) {
        try {
            const challenges = await ChallengeModel.find();
            res.status(200).json(challenges);
        } catch (error) {
            console.error('Error fetching challenges:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update a challenge by ID
    async updateChallenge(req, res) {
        try {
            const { description, difficulty, scoring } = req.body;

            // Validate input
            if (!description && !difficulty && !scoring) {
                return res.status(400).json({ message: 'At least one field (description, difficulty, scoring) is required to update' });
            }

            const challenge = await ChallengeModel.findByIdAndUpdate(
                req.params.id,
                { description, difficulty, scoring },
                { new: true, runValidators: true }
            );

            if (!challenge) {
                return res.status(404).json({ message: 'Challenge not found' });
            }
            res.status(200).json({ message: 'Challenge updated successfully', challenge });
        } catch (error) {
            console.error('Error updating challenge:', error.message);
            res.status(400).json({ error: 'Bad Request' });
        }
    }

    // Delete a challenge by ID
    async deleteChallenge(req, res) {
        try {
            const challenge = await ChallengeModel.findByIdAndDelete(req.params.id);
            if (!challenge) {
                return res.status(404).json({ message: 'Challenge not found' });
            }
            res.status(200).json({ message: 'Challenge deleted successfully' });
        } catch (error) {
            console.error('Error deleting challenge:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new ChallengeController();
