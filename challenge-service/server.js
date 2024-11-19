require('dotenv').config(); // Loads .env variables
const express = require('express');
const mongoose = require('mongoose');
const challengeRoutes = require('./routes/challengeRoutes'); 

const app = express();

const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
app.use('/challenges', challengeRoutes);
const cors = require('cors');
app.use(cors());
// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Use the environment variables as needed, e.g., in database connections, etc.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
