const ChallengeModel = require('../models/challengeModel');

class ChallengeController {
    // Create a new challenge
    async createChallenge(req, res) {
        try {
            const challenge = await ChallengeModel.create(req.body);
            res.status(201).json(challenge);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get a single challenge by ID
    async getChallengeById(req, res) {
        try {
            const challenge = await ChallengeModel.findById(req.params.id);
            if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
            res.status(200).json(challenge);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all challenges
    async getAllChallenges(req, res) {
        try {
            const challenges = await ChallengeModel.find();
            res.status(200).json(challenges);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a challenge by ID
    async updateChallenge(req, res) {
        try {
            const challenge = await ChallengeModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
            res.status(200).json(challenge);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete a challenge by ID
    async deleteChallenge(req, res) {
        try {
            const challenge = await ChallengeModel.findByIdAndDelete(req.params.id);
            if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
            res.status(200).json({ message: 'Challenge deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChallengeController();
