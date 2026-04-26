const Article = require('../models/articleModel');

const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

const addArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add article' });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(article);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update article' });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete article' });
    }
};

module.exports = {
    getArticles,
    addArticle,
    updateArticle,
    deleteArticle
};
