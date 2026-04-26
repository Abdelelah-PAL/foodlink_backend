const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Slider', sliderSchema);
