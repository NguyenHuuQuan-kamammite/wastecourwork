const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
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