require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const wasteItemRoutes = require('./routes/wasteItemRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for Waste Item Service'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', wasteItemRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Waste Item Service is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Waste Item Service is running on port ${PORT}`);
});