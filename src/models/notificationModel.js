const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    image_url: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    user_type_id: {
        type: Number,
        default: 1
    },
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: [true, 'Meal ID is required']
    },
    meal_name: {
        type: String,
        required: [true, 'Meal name is required']
    },
    missing_ingredients: [{
        type: String
    }],
    notes: {
        type: String,
        default: ''
    },
    seen: {
        type: Boolean,
        default: false
    },
    is_meal_planned: {
        type: Boolean,
        default: false
    },
    is_confirmation: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
