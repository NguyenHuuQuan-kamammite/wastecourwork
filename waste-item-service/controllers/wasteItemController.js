const WasteItem = require('../models/wasteItemModel');  // Import WasteItem model

// Get all waste items with populated category details
exports.getAllItems = async (req, res) => {
    try {
        const items = await WasteItem.find().populate('category');  // Populate 'category' field
        res.status(200).json(items);  // Return the items with populated category details
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve waste items' });
    }
};

// Create a new waste item
exports.createItem = async (req, res) => {
    try {
        const { name, category, description, sortingInstructions } = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' });
        }

        // Create a new waste item
        const newItem = new WasteItem({
            name,
            category,
            description,
            sortingInstructions,
        });

        // Save the new waste item to the database
        await newItem.save();

        // Return the newly created item
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create waste item' });
    }
};

// Update a waste item by ID
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await WasteItem.findByIdAndUpdate(id, req.body, { new: true }).populate('category');

        // Check if the item exists
        if (!updatedItem) {
            return res.status(404).json({ message: 'Waste item not found' });
        }

        // Return the updated item
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update waste item' });
    }
};

// Delete a waste item by ID
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await WasteItem.findByIdAndDelete(id);

        // Check if the item exists
        if (!deletedItem) {
            return res.status(404).json({ message: 'Waste item not found' });
        }

        // Return success message
        res.status(200).json({ message: 'Waste item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete waste item' });
    }
};
