const User = require('../models/userModel');
const authService = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        console.log(req.body)

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await authService.hashPassword(password);
        const user = await User.create({
            username,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: authService.generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ username });
        if (user && (await authService.comparePassword(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: authService.generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};
