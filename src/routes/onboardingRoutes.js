const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', onboardingController.getOnboarding);
router.post('/', protect, isAdmin, onboardingController.addOnboarding);
router.put('/:id', protect, isAdmin, onboardingController.updateOnboarding);
router.delete('/:id', protect, isAdmin, onboardingController.deleteOnboarding);

module.exports = router;
