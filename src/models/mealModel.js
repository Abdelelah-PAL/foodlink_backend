const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false // Optional for AI generated meals before classification
    },
    name: {
        type: String,
        required: [true, 'Meal name is required']
    },
    image_url: {
        type: String,
        required: [true, 'Image URL is mandatory']
    },
    ingredients: {
        type: [String],
        default: []
    },
    recipe: {
        type: [String],
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    is_favorite: {
        type: Boolean,
        default: false
    },
    source: {
        type: String,
        default: 'AI Generated'
    },
    is_published: {
        type: Boolean,
        default: false // Admin must approve to publish
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    prep_time: {
        type: String,
        default: '20-30 mins'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Meal', mealSchema);
