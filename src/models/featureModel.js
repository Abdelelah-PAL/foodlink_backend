const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    ar_image_url: {
        type: String,
        required: [true, 'Arabic image URL is required']
    },
    en_image_url: {
        type: String,
        required: [true, 'English image URL is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    premium: {
        type: Boolean,
        default: false
    },
    keyword: {
        type: String,
        required: [true, 'Keyword is required'],
        unique: true
    },
    user: {
        type: Boolean,
        default: true
    },
    cooker: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Feature', featureSchema);
