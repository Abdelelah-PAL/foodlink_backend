const Notification = require('../models/notificationModel');

const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id })
            .populate('meal')
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create notification', details: error.message });
    }
};

const markNotificationsAsSeen = async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user._id, seen: false },
            { seen: true }
        );
        res.json({ message: 'Notifications marked as seen' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update notifications' });
    }
};

const deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
};

module.exports = {
    getMyNotifications,
    createNotification,
    markNotificationsAsSeen,
    deleteNotification
};
