const mongoose = require('mongoose');

const weeklyPlanSchema = new mongoose.Schema({
    days_meals: { type: Array, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    interval_start_time: { type: Date, required: true },
    interval_end_time: { type: Date, required: true }
}, {
    timestamps: true
});

weeklyPlanSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.documentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('WeeklyPlan', weeklyPlanSchema);
