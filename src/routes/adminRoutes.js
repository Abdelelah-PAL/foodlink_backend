const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.use(protect);
router.use(isAdmin);

router.get('/stats', adminController.getDashboardStats);
router.get('/meals/pending', adminController.getUnpublishedMeals);
router.put('/meals/:id/approve', adminController.approveMeal);
router.get('/users', adminController.getAllUsers);

module.exports = router;
