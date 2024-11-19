const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Function to handle proxy requests
const proxyRequest = async (req, res, target) => {
  try {
    // Xử lý loại bỏ dấu '/' thừa ở cuối đường dẫn
    const url = `${target.replace(/\/$/, '')}${req.originalUrl.replace('/api', '')}`;

    console.log("Forwarding request to: ", url); // In ra URL để kiểm tra

    // Gửi request đến service sử dụng axios
    const response = await axios({
      method: req.method,
      url, // URL chính xác cho service mục tiêu
      headers: {
        ...(req.headers['authorization'] && { Authorization: req.headers['authorization'] }),
        ...(req.headers['content-type'] && { 'Content-Type': req.headers['content-type'] }),
      },
      data: req.body, // Forward body nếu có
    });

    // Trả lại response từ service cho client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error.message);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Service Unavailable' });
    }
  }
};




// Proxy routes
app.use('/users', (req, res) => proxyRequest(req, res, process.env.USER_SERVICE_URL || 'http://localhost:3001'));
app.use('/challenges', (req, res) => proxyRequest(req, res, process.env.CHALLENGE_SERVICE_URL || 'http://localhost:3002'));
app.use('/categories', (req, res) => proxyRequest(req, res, process.env.WASTE_CATEGORY_SERVICE_URL || 'http://localhost:3003'));
app.use('/items', (req, res) => proxyRequest(req, res, process.env.WASTE_ITEM_SERVICE_URL || 'http://localhost:3004'));

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
