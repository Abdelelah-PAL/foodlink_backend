const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/my', notificationController.getMyNotifications);
router.post('/', notificationController.createNotification);
router.put('/seen', notificationController.markNotificationsAsSeen);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
