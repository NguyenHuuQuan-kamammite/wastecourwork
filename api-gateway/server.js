require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Middleware để chuyển tiếp yêu cầu

const app = express();
const PORT = process.env.PORT || 8000; // API Gateway chạy trên cổng 8000

// Middleware để phân tích JSON
app.use(express.json());

// Proxy Configuration (Chuyển tiếp yêu cầu đến các service cụ thể)
app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://localhost:3001', // Địa chỉ của user-service
    changeOrigin: true,
    pathRewrite: { '^/api/users': '' }, // Xóa tiền tố /api/users khỏi URL
}));

app.use('/api/challenges', createProxyMiddleware({
    target: process.env.CHALLENGE_SERVICE_URL || 'http://localhost:3002', // Địa chỉ của challenge-service
    changeOrigin: true,
    pathRewrite: { '^/api/challenges': '' }, // Xóa tiền tố /api/challenges khỏi URL
}));

app.use('/api/categories', createProxyMiddleware({
    target: process.env.WASTE_CATEGORY_SERVICE_URL || 'http://localhost:3003', // Địa chỉ của waste-category-service
    changeOrigin: true,
    pathRewrite: { '^/api/categories': '' }, // Xóa tiền tố /api/categories khỏi URL
}));

app.use('/api/items', createProxyMiddleware({
    target: process.env.WASTE_ITEM_SERVICE_URL || 'http://localhost:3004', // Address of waste-item-service
    changeOrigin: true,
    pathRewrite: { '^/api/items': '' }, // Remove the /api/items prefix
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

// Kết nối MongoDB cho các tác vụ toàn cục (nếu cần)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for API Gateway'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});