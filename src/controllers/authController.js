const User = require('../models/userModel');
const Settings = require('../models/settingsModel');
const authService = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await authService.hashPassword(password);
        
        // Create User record
        const user = await User.create({
            email,
            password: hashedPassword,
            role: 'user',
            user_type_id: 2
        });
        await Settings.create({ user_id: user._id });

        // Create Cooker record
        const cooker = await User.create({
            email,
            password: hashedPassword,
            role: 'cooker',
            user_type_id: 1
        });
        await Settings.create({ user_id: cooker._id });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: authService.generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        const user = await User.findOne({ email });
        console.log(user);
        if (user && (await authService.comparePassword(password, user.password))) {
            res.json({
                _id: user._id,
                email: user.email,
                token: authService.generateToken(user._id)
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
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

const selectRole = async (req, res) => {
    try {
        const { email, roleId } = req.body;
        const user = await User.findOne({ email, user_type_id: parseInt(roleId) });

        if (user) {
            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                user_type_id: user.user_type_id,
                token: authService.generateToken(user._id)
            });
        } else {
            res.status(404).json({ error: 'User with this role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Role selection failed', details: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    selectRole
};

