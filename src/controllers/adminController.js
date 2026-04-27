const Meal = require('../models/mealModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

const getDashboardStats = async (req, res) => {
    try {
        const totalMeals = await Meal.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalCategories = await Category.countDocuments();
        const unpublishedMeals = await Meal.countDocuments({ is_published: false });

        res.json({
            stats: {
                totalMeals,
                totalUsers,
                totalCategories,
                unpublishedMeals
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};

const getUnpublishedMeals = async (req, res) => {
    try {
        const meals = await Meal.find({ is_published: false }).populate('category');
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch unpublished meals' });
    }
};

const approveMeal = async (req, res) => {
    try {
        const meal = await Meal.findByIdAndUpdate(
            req.params.id,
            { is_published: true },
            { new: true }
        );
        res.json({ message: 'Meal approved and published', meal });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve meal' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getAdminProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'Admin not found' });

        res.json({
            admin_id: user._id,
            email: user.email || '',
            name: user.name || user.username
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch admin profile' });
    }
};

module.exports = {
    getDashboardStats,
    getUnpublishedMeals,
    approveMeal,
    getAllUsers,
    getAdminProfile
};
