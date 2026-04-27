const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    en_first_text_span: {
        type: String,
        required: [true, 'English first text span is required']
    },
    ar_first_text_span: {
        type: String,
        required: [true, 'Arabic first text span is required']
    },
    en_second_text_span: {
        type: String,
        required: [true, 'English second text span is required']
    },
    ar_second_text_span: {
        type: String,
        required: [true, 'Arabic second text span is required']
    },
    en_third_text_span: {
        type: String,
        default: ''
    },
    ar_third_text_span: {
        type: String,
        default: ''
    },
    image_url: {
        type: String,
        required: [true, 'Image URL is required']
    },
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Onboarding', onboardingSchema);
