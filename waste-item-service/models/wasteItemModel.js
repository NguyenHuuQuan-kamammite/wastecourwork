const mongoose = require('mongoose');

// Define the schema with a reference to WasteCategory
const wasteItemSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the waste item (e.g., Plastic Bottle)
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'WasteCategory', 
        required: true  // Reference to the WasteCategory model
    },
    description: { type: String },  // Description of the waste item
    sortingInstructions: { type: String },  // Sorting instructions for disposal (e.g., "Place in recycling bin")
});

// Create and export the model
module.exports = mongoose.model('WasteItem', wasteItemSchema);
