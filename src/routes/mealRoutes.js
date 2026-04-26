const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const { protect } = require('../middlewares/authMiddleware');

// Public or Optional Auth
router.post('/generate', (req, res, next) => {
    // Optional auth: try to decode token but don't fail if not present
    if (req.headers.authorization) {
        return protect(req, res, next);
    }
    next();
}, mealController.generateMeal);

router.get('/published', mealController.getPublishedMeals);
router.get('/:id', mealController.getMealById);

// Protected routes
router.post('/save', protect, mealController.saveMeal);
router.delete('/:id', protect, mealController.removeMeal);

module.exports = router;
