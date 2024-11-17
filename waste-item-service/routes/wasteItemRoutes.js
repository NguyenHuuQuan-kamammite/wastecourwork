const express = require('express');
const router = express.Router();
const wasteItemController = require('../controllers/wasteItemController');

// Welcome Route
router.get('/', (req, res) => {
    res.status(200).send("Welcome to the Waste Item API!");
});

// Get all waste items
router.get('/items', wasteItemController.getAllItems);

// Add a new waste item
router.post('/items', wasteItemController.createItem);

// Update a waste item by ID
router.put('/items/:id', wasteItemController.updateItem);

// Delete a waste item by ID
router.delete('/items/:id', wasteItemController.deleteItem);

module.exports = router;
//aaa