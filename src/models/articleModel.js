const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: [true, 'Image URL is required']
    },
    url: {
        type: String,
        required: [true, 'Article URL is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);
