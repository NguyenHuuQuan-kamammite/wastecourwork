// models/wasteCategoryModel.js
const mongoose = require('mongoose');

// Define the schema
const wasteCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    disposalGuidelines: { type: String },
});

// Create and export the model
module.exports = mongoose.model('WasteCategory', wasteCategorySchema);

