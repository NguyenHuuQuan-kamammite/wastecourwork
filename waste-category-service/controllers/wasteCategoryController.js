// controllers/wasteCategoryController.js
const WasteCategory = require('../models/wasteCategoryModel');

// Get all waste categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await WasteCategory.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving categories', error: err });
    }
};

// Create a new waste category
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Category name and description are required' });
    }

    try {
        const newCategory = new WasteCategory({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: 'Error creating category', error: err });
    }
};

// Update a waste category by ID
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Category name and description are required' });
    }

    try {
        const category = await WasteCategory.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error updating category', error: err });
    }
};

// Delete a waste category by ID
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await WasteCategory.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category', error: err });
    }
};
