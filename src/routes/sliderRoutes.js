const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', sliderController.getSliders);
router.post('/', protect, isAdmin, sliderController.addSlider);
router.put('/:id', protect, isAdmin, sliderController.updateSlider);
router.delete('/:id', protect, isAdmin, sliderController.deleteSlider);

module.exports = router;
