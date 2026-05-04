const WeeklyPlan = require('../models/weeklyPlanModel');

const addWeeklyPlan = async (req, res) => {
    try {
        // First delete existing plans for this interval
        await WeeklyPlan.deleteMany({
            user_id: req.user._id,
            interval_start_time: req.body.interval_start_time,
            interval_end_time: req.body.interval_end_time
        });
        
        const plan = await WeeklyPlan.create({ ...req.body, user_id: req.user._id });
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create weekly plan', details: error.message });
    }
};

const getWeeklyPlans = async (req, res) => {
    try {
        const plans = await WeeklyPlan.find({ user_id: req.user._id });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weekly plans' });
    }
};

const deleteWeeklyPlan = async (req, res) => {
    try {
        await WeeklyPlan.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
        res.json({ message: 'Weekly plan deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete weekly plan' });
    }
};

module.exports = {
    addWeeklyPlan,
    getWeeklyPlans,
    deleteWeeklyPlan
};
