const Meal = require('../models/mealModel');
const PlannedMeal = require('../models/plannedMealModel');

const generateMeal = async (req, res) => {
    try { res.status(200).json({ message: "Mock generate" }); } catch (error) { res.status(500).json({ error: error.message }); }
};

const saveMeal = async (req, res) => {
    try {
        const meal = await Meal.create({ ...req.body, user: req.user._id });
        res.status(201).json(meal);
    } catch (error) { res.status(400).json({ error: 'Failed to create meal', details: error.message }); }
};

const getPublishedMeals = async (req, res) => {
    try {
        const meals = await Meal.find({ is_published: true }).populate('category', 'name icon_url');
        res.json(meals);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch meals' }); }
};

const getMealById = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id).populate('category', 'name icon_url');
        if (!meal) return res.status(404).json({ error: 'Meal not found' });
        res.json(meal);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch meal' }); }
};

const removeMeal = async (req, res) => {
    try {
        const meal = await Meal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!meal) return res.status(404).json({ error: 'Meal not found or unauthorized' });
        res.json({ message: 'Meal removed' });
    } catch (error) { res.status(500).json({ error: 'Failed to remove meal' }); }
};

// --- NEW METHODS FOR FLUTTER APP ---

const getAllMealsByCategory = async (req, res) => {
    try {
        const { category_id, user_id } = req.query;
        // In mongoose, we either use category (ObjectId) or category_id (number) depending on schema updates
        // To be safe and support both, we query by the specific field Flutter sends
        let query = {};
        if (category_id) query.category_id = category_id;
        if (user_id) query.user_id = user_id;
        
        const meals = await Meal.find(query);
        res.json(meals);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch meals by category' }); }
};

const getFavorites = async (req, res) => {
    try {
        const { user_id } = req.query;
        const meals = await Meal.find({ user_id: user_id, is_favorite: true });
        res.json(meals);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch favorites' }); }
};

const toggleIsFavorite = async (req, res) => {
    try {
        const { is_favorite } = req.body;
        const meal = await Meal.findByIdAndUpdate(req.params.id, { is_favorite }, { new: true });
        res.json(meal);
    } catch (error) { res.status(400).json({ error: 'Failed to toggle favorite' }); }
};

const updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(meal);
    } catch (error) { res.status(400).json({ error: 'Failed to update meal' }); }
};

const getAllPlannedMeals = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const meals = await PlannedMeal.find({ date: { $gte: startOfDay } })
            .sort({ date: 1 })
            .limit(7);
        res.json(meals);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch planned meals' }); }
};

const getPlannedMealById = async (req, res) => {
    try {
        const meal = await PlannedMeal.findById(req.params.id);
        res.json(meal);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch planned meal' }); }
};

const getAllSuggestedMealsByCategory = async (req, res) => {
    try {
        const { category_id } = req.query;
        const meals = await Meal.find({ category_id: category_id, type_id: 2 }); // assuming 2 is suggestedMeal
        res.json(meals);
    } catch (error) { res.status(500).json({ error: 'Failed to fetch suggested meals' }); }
};

const fetchLatestDishOfTheWeek = async (req, res) => {
    try {
        // Mock dish of the week
        res.json({ name: "Special Pasta", description: "Dish of the week" });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch dish of the week' }); }
};

const uploadMealImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const imageUrl = `/uploads/meals_images/${req.file.filename}`;
        res.json({ image_url: imageUrl });
    } catch (error) { res.status(500).json({ error: 'Upload failed' }); }
};

module.exports = {
    generateMeal, saveMeal, getPublishedMeals, getMealById, removeMeal,
    getAllMealsByCategory, getFavorites, toggleIsFavorite, updateMeal,
    getAllPlannedMeals, getPlannedMealById, getAllSuggestedMealsByCategory,
    fetchLatestDishOfTheWeek, uploadMealImage
};
