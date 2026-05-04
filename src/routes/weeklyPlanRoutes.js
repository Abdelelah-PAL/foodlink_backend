const express = require('express');
const router = express.Router();
const weeklyPlanController = require('../controllers/weeklyPlanController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', weeklyPlanController.addWeeklyPlan);
router.get('/', weeklyPlanController.getWeeklyPlans);
router.delete('/:id', weeklyPlanController.deleteWeeklyPlan);

module.exports = router;
