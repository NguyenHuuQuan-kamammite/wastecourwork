// services/wasteCategoryService.js
const WasteCategory = require('../models/WasteCategory');

// Service to get all categories
const getAllCategories = async () => {
    try {
        return await WasteCategory.find();
    } catch (error) {
        throw new Error('Error retrieving categories');
    }
};

// Service to create a new category
const createCategory = async (categoryData) => {
    try {
        const newCategory = new WasteCategory(categoryData);
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw new Error('Error creating category');
    }
};

// Service to update a category by ID
const updateCategory = async (categoryId, categoryData) => {
    try {
        const updatedCategory = await WasteCategory.findByIdAndUpdate(categoryId, categoryData, { new: true });
        if (!updatedCategory) {
            throw new Error('Category not found');
        }
        return updatedCategory;
    } catch (error) {
        throw new Error('Error updating category');
    }
};

// Service to delete a category by ID
const deleteCategory = async (categoryId) => {
    try {
        const deletedCategory = await WasteCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            throw new Error('Category not found');
        }
        return deletedCategory;
    } catch (error) {
        throw new Error('Error deleting category');
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
