const Settings = require('../models/settingsModel');

const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ user_id: req.user._id });
        if (!settings) {
            settings = await Settings.create({ user_id: req.user._id });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};

const updateSettings = async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate(
            { user_id: req.user._id },
            req.body,
            { new: true, upsert: true }
        );
        res.json(settings);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update settings' });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
