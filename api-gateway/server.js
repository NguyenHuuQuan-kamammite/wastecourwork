const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route Imports
const userRoutes = require('../user-service/routes/userRoutes.js');
const categoryRoutes = require('../waste-category-service/routes/wasteCategoryRoutes.js');
const itemRoutes = require('../waste-item-service/routes/wasteItemRoutes.js');
const challengeRoutes = require('../challenge-service/routes/challengeRoutes.js');

// Routes
app.use('/users', userRoutes);
app.use('/waste-categories', categoryRoutes);
app.use('/waste-items', itemRoutes);
app.use('/challenges', challengeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});