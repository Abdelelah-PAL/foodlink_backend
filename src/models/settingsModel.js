const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    active_notifications: { type: Boolean, default: true },
    active_updates: { type: Boolean, default: true },
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
