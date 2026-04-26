const Category = require('../models/categoryModel');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, icon_url } = req.body;
        const category = await Category.create({ name, icon_url });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create category', details: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

module.exports = {
    getCategories,
    createCategory,
    deleteCategory
};
