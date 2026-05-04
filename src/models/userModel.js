const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        sparse: true // Allow null for old users if any
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'cooker'],
        default: 'user'
    },
    user_type_id: {
        type: Number,
        default: 2 // 2 for user, 1 for cooker
    },
    subscriber: {
        type: Boolean,
        default: false
    },
    image_url: {
        type: String,
        default: null
    },
    allergies: [{
        type: String
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
