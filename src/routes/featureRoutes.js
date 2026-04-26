const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', featureController.getFeatures);
router.post('/', protect, isAdmin, featureController.addFeature);
router.put('/:id', protect, isAdmin, featureController.updateFeature);
router.delete('/:id', protect, isAdmin, featureController.deleteFeature);

module.exports = router;
