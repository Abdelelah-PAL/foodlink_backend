const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleId } = req.query;
        let query;

        // Check if id is a valid MongoDB ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            query = { _id: id };
        } else {
            // Assume it's an email
            query = { email: id };
        }

        if (roleId) {
            query.user_type_id = parseInt(roleId);
        }

        const user = await User.findOne(query).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const getUsersByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const users = await User.find({ email }).select('-password');
        if (users.length === 0) return res.status(404).json({ error: 'No users found for this email' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { username, email, image_url } = req.body;
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (image_url) updateData.image_url = image_url;

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            updateData,
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};

const updateUsername = async (req, res) => {
    try {
        const { userId, roleId, username } = req.body;
        const query = { email: userId, user_type_id: parseInt(roleId) };
        
        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.username && username) {
            user.username = username;
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update username', details: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(req.user._id, { password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update password' });
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Assuming we serve static files from 'uploads/'
        const imageUrl = `/uploads/profile_pictures/${req.file.filename}`;

        // Return URL to be used in updateUserDetails
        res.json({ image_url: imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Upload failed' });
    }
};

module.exports = {
    getUser,
    getUsersByEmail,
    updateUser,
    updateUsername,
    changePassword,
    uploadProfileImage
};

