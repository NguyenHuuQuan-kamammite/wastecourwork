require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Middleware for proxying requests

const app = express();
const PORT = process.env.PORT || 8000; // API Gateway runs on port 8000

// Middleware to parse JSON
app.use(express.json());

// Proxy Configuration (Forward requests to specific services)
app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:3001', // Default to localhost if no URL in .env
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' }, // Remove '/api/users' from the forwarded URL
    logLevel: 'debug', // Enable detailed logs for debugging
}));

app.use('/api/challenges', createProxyMiddleware({
    target: process.env.CHALLENGE_SERVICE_URL || 'http://localhost:3002', // Default to localhost if no URL in .env
    changeOrigin: true,
    pathRewrite: { '^/api/challenges': '' }, // Remove '/api/challenges' from the forwarded URL
}));

app.use('/api/categories', createProxyMiddleware({
    target: process.env.WASTE_CATEGORY_SERVICE_URL || 'http://localhost:3003', // Default to localhost if no URL in .env
    changeOrigin: true,
    pathRewrite: { '^/api/categories': '' }, // Remove '/api/categories' from the forwarded URL
}));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Waste Management App API Gateway!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!', error: err.message });
});

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully for API Gateway');
    console.log(`Connected to MongoDB at: ${process.env.MONGO_URI}`);
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Detailed error:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
console.log(process.env.USER_SERVICE_URL); // Kiểm tra URL của dịch vụ người dùng
console.log(process.env.CHALLENGE_SERVICE_URL); // Kiểm tra URL của dịch vụ thử thách
console.log(process.env.WASTE_CATEGORY_SERVICE_URL); // Kiểm tra URL của dịch vụ loại rác
console.log(process.env.MONGO_URI); // Kiểm tra URL của MongoDB