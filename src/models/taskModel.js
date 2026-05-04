const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_type_id: { type: Number, required: true }
}, {
    timestamps: true
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.documentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Task', taskSchema);
