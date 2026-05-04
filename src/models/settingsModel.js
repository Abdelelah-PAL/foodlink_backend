const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    notifications: { type: Boolean, default: true },
    updates: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
}, {
    timestamps: true
});

settingsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.documentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Settings', settingsSchema);
