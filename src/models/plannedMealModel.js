const mongoose = require('mongoose');

// Extends meal structure but intended for planned meals collection
const plannedMealSchema = new mongoose.Schema({
    category_id: { type: Number },
    type_id: { type: Number },
    name: { type: String, required: true },
    image_url: { type: String },
    ingredients: { type: [String], default: [] },
    recipe: { type: [String], default: [] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    source: { type: String },
    date: { type: Date }
}, {
    timestamps: true
});

plannedMealSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.documentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('PlannedMeal', plannedMealSchema);
