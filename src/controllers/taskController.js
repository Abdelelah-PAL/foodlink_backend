const Task = require('../models/taskModel');

const addTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, user_id: req.user._id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create task', details: error.message });
    }
};

const getTasksByDate = async (req, res) => {
    try {
        const { date, user_type_id } = req.query;
        // Search logic might need Date range parsing depending on how Flutter formats date query
        const searchDate = new Date(date);
        
        const tasks = await Task.find({
            user_id: req.user._id,
            user_type_id: user_type_id,
            date: {
                $gte: new Date(searchDate.setHours(0,0,0,0)),
                $lte: new Date(searchDate.setHours(23,59,59,999))
            }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user_id: req.user._id },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user_id: req.user._id });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task' });
    }
};

module.exports = {
    addTask,
    getTasksByDate,
    updateTask,
    deleteTask,
    getTaskById
};
