const wasteItemService = require('../services/wasteItemService');

// Get all waste items
exports.getAllItems = async (req, res) => {
    try {
        const items = await wasteItemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve waste items' });
    }
};

// Create a new waste item
exports.createItem = async (req, res) => {
    try {
        const { name, category, description } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' });
        }

        const newItem = await wasteItemService.createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create waste item' });
    }
};

// Update a waste item by ID
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await wasteItemService.updateItem(id, req.body);

        // Check if the item exists
        if (!updatedItem) {
            return res.status(404).json({ message: 'Waste item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update waste item' });
    }
};

// Delete a waste item by ID
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await wasteItemService.deleteItem(id);

        // Check if the item exists
        if (!deletedItem) {
            return res.status(404).json({ message: 'Waste item not found' });
        }

        res.status(200).json({ message: 'Waste item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete waste item' });
    }
};


//aaa