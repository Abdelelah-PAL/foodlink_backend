const mealService = require('../services/mealService');

const generateMeal = async (req, res) => {
    try {
        const { ingredients } = req.body;
        const userId = req.user ? req.user._id : null;

        if (!ingredients || typeof ingredients !== 'string') {
            return res.status(400).json({ error: 'Ingredients string is required' });
        }

        const meals = await mealService.generateMealFromAI(ingredients, userId);
        res.json(meals);
    } catch (error) {
        console.error('Error generating meal:', error);
        res.status(500).json({ error: 'Failed to generate meal', details: error.message });
    }
};

const getPublishedMeals = async (req, res) => {
    try {
        const { category, search, page, limit } = req.query;
        const result = await mealService.getAllPublishedMeals(
            { category, search },
            { page: parseInt(page), limit: parseInt(limit) }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
};

const getMealById = async (req, res) => {
    try {
        const meal = await mealService.getSavedMealById(req.params.id);
        if (!meal) return res.status(404).json({ error: 'Meal not found' });
        res.json(meal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meal' });
    }
};

const saveMeal = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const meal = await mealService.saveMeal(req.body, userId);
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeMeal = async (req, res) => {
    try {
        const meal = await mealService.deleteSavedMeal(req.params.id);
        if (!meal) return res.status(404).json({ error: 'Meal not found' });
        res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete meal' });
    }
};

module.exports = {
    generateMeal,
    getPublishedMeals,
    getMealById,
    saveMeal,
    removeMeal
};
