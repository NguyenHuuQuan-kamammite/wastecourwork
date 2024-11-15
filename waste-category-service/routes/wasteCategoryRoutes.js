// routes/wasteCategoryRoutes.js
const express = require('express');
const router = express.Router();
const wasteCategoryController = require('../controllers/wasteCategoryController');

// Welcome Route
router.get('/', (req, res) => {
    res.status(200).send("Welcome to the Waste Category API!");
});

// POST: Create a new waste category
router.post('/', wasteCategoryController.createCategory);  // '/' here matches '/api/categories' in server.js

module.exports = router;
