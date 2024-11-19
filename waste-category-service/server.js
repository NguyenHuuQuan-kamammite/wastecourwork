// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const wasteCategoryRoutes = require('./routes/wasteCategoryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for Waste Category Service'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
<<<<<<< Updated upstream
app.use('/api/categories', wasteCategoryRoutes);
=======
app.use('/categories', wasteCategoryRoutes);
>>>>>>> Stashed changes

// Start Server
app.listen(PORT, () => {
    console.log(`Waste Category Service is running on port ${PORT}`);
});
