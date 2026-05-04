const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/meals_images';
        if (!fs.existsSync(dir)){ fs.mkdirSync(dir, { recursive: true }); }
        cb(null, dir);
    },
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

router.post('/generate', (req, res, next) => {
    if (req.headers.authorization) { return protect(req, res, next); }
    next();
}, mealController.generateMeal);

router.get('/published', mealController.getPublishedMeals);
router.get('/by-category', mealController.getAllMealsByCategory);
router.get('/favorites', mealController.getFavorites);
router.get('/planned', mealController.getAllPlannedMeals);
router.get('/planned/:id', mealController.getPlannedMealById);
router.get('/suggested', mealController.getAllSuggestedMealsByCategory);
router.get('/dish-of-the-week', mealController.fetchLatestDishOfTheWeek);

router.get('/:id', mealController.getMealById);

// Protected routes
router.use(protect);
router.post('/save', mealController.saveMeal);
router.put('/:id', mealController.updateMeal);
router.delete('/:id', mealController.removeMeal);
router.put('/:id/favorite', mealController.toggleIsFavorite);
router.post('/upload-image', upload.single('image'), mealController.uploadMealImage);

module.exports = router;
