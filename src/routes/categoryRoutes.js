const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', categoryController.getCategories);
router.post('/', protect, isAdmin, categoryController.createCategory);
router.delete('/:id', protect, isAdmin, categoryController.deleteCategory);

module.exports = router;
