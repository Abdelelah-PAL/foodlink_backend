const { getGeminiModel } = require('../config/gemini');
const Meal = require('../models/mealModel');
const User = require('../models/userModel');

const generateMealFromAI = async (ingredients, userId = null) => {
    let preferencesPrompt = "";

    if (userId) {
        const user = await User.findById(userId);
        if (user) {
            const allergies = user.allergies.join(', ');
            if (allergies) preferencesPrompt += ` - IMPORTANT: The user is allergic to: ${allergies}. DO NOT include these.`;
        }
    }

    const model = getGeminiModel();

    const prompt = `
You are a master chef. Generate a delicious meal recipe that incorporates the following ingredients: ${ingredients}.
Feel free to add common pantry elements like salt, pepper, oil, water, etc.
${preferencesPrompt}
You must return a JSON array containing a single meal object.
THE JSON MUST REFLECT THIS EXACT STRUCTURE:
[
  {
    "name": "Name of the meal",
    "image_url": "https://image.pollinations.ai/prompt/professional_food_photography_of_[MEAL_NAME_IN_ENGLISH]_highly_detailed_8k?width=1024&height=1024",
    "ingredients": ["ingredient 1", "ingredient 2", ...],
    "recipe": ["Step 1", "Step 2", ...],
    "prep_time": "20-30 mins",
    "source": "AI Generated"
  }
]
- IMPORTANT: The "image_url" field is MANDATORY.
- For "image_url", replace [MEAL_NAME_IN_ENGLISH] with a URL-friendly English translation of the meal name.
- Ensure "name", "ingredients", and "recipe" are in the language of the provided ingredients (${ingredients}).
- Return ONLY raw JSON text. No markdown formatting.
`;

    console.log('Generating content with Gemini AI...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let mealsData;
    try {
        mealsData = JSON.parse(responseText);
    } catch (e) {
        console.warn('JSON parse failed, attempting cleanup.');
        const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        mealsData = JSON.parse(cleanedText);
    }

    return mealsData;
};

const getAllPublishedMeals = async (filters = {}, options = {}) => {
    const { category, search } = filters;
    const { page = 1, limit = 10 } = options;

    const query = { is_published: true };

    if (category) query.category = category;
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const meals = await Meal.find(query)
        .populate('category')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Meal.countDocuments(query);

    return {
        meals,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    };
};

const getSavedMealById = async (id) => {
    return await Meal.findById(id).populate('category');
};

const saveMeal = async (mealData, userId = null) => {
    const newMeal = new Meal({
        ...mealData,
        user: userId
    });
    return await newMeal.save();
};

const deleteSavedMeal = async (id) => {
    return await Meal.findByIdAndDelete(id);
};

module.exports = {
    generateMealFromAI,
    getAllPublishedMeals,
    getSavedMealById,
    saveMeal,
    deleteSavedMeal
};
