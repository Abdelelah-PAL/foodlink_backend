const Slider = require('../models/sliderModel');

const getSliders = async (req, res) => {
    try {
        const sliders = await Slider.find({ active: true });
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sliders' });
    }
};

const addSlider = async (req, res) => {
    try {
        const slider = await Slider.create(req.body);
        res.status(201).json(slider);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add slider' });
    }
};

const updateSlider = async (req, res) => {
    try {
        const slider = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(slider);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update slider' });
    }
};

const deleteSlider = async (req, res) => {
    try {
        await Slider.findByIdAndDelete(req.params.id);
        res.json({ message: 'Slider deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete slider' });
    }
};

module.exports = {
    getSliders,
    addSlider,
    updateSlider,
    deleteSlider
};
