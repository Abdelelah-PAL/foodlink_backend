const Onboarding = require('../models/onboardingModel');

const getOnboarding = async (req, res) => {
    try {
        const onboardingContent = await Onboarding.find({ active: true }).sort({ order: 1 });
        res.json(onboardingContent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch onboarding content' });
    }
};

const addOnboarding = async (req, res) => {
    try {
        const onboarding = await Onboarding.create(req.body);
        res.status(201).json(onboarding);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add onboarding content', details: error.message });
    }
};

const updateOnboarding = async (req, res) => {
    try {
        const onboarding = await Onboarding.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!onboarding) return res.status(404).json({ error: 'Onboarding content not found' });
        res.json(onboarding);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update onboarding content' });
    }
};

const deleteOnboarding = async (req, res) => {
    try {
        const onboarding = await Onboarding.findByIdAndDelete(req.params.id);
        if (!onboarding) return res.status(404).json({ error: 'Onboarding content not found' });
        res.json({ message: 'Onboarding content deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete onboarding content' });
    }
};

module.exports = {
    getOnboarding,
    addOnboarding,
    updateOnboarding,
    deleteOnboarding
};
