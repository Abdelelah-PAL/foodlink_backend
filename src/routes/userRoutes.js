const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/profile_pictures';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, req.user._id + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.use(protect);

router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.post('/change-password', userController.changePassword);
router.post('/upload-image', upload.single('image'), userController.uploadProfileImage);

module.exports = router;
