const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true
    },
    image_url: {
        type: String,
        default: ''
    },
    meals_name: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Configure JSON serialization to include id instead of _id
categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Category', categorySchema);
