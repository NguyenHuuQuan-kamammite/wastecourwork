const mongoose = require('mongoose');

// Define the schema with a reference to WasteCategory
const wasteItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteCategory', required: true },
    description: { type: String },
    sortingInstructions: { type: String },
});

// Create and export the model
module.exports = mongoose.model('WasteItem', wasteItemSchema);
