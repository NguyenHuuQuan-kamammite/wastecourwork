const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    description: { type: String, required: true },
    difficulty: { type: Number, required: true },
    scoring: { type: Number, default: 0 },
    // Additional fields can go here
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
