const Feature = require('../models/featureModel');

const getFeatures = async (req, res) => {
    try {
        const features = await Feature.find();
        res.json(features);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch features' });
    }
};

const addFeature = async (req, res) => {
    try {
        const feature = await Feature.create(req.body);
        res.status(201).json(feature);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add feature', details: error.message });
    }
};

const updateFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feature) return res.status(404).json({ error: 'Feature not found' });
        res.json(feature);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update feature' });
    }
};

const deleteFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndDelete(req.params.id);
        if (!feature) return res.status(404).json({ error: 'Feature not found' });
        res.json({ message: 'Feature deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete feature' });
    }
};

module.exports = {
    getFeatures,
    addFeature,
    updateFeature,
    deleteFeature
};
