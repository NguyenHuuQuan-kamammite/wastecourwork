const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const challengeRoutes = require('./routes/challengeRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Database connection error:', err));

// API Routes
app.use('/api/challenges', challengeRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Waste Management App API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});