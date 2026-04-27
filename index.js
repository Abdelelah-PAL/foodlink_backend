require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Route imports
const authRoutes = require('./src/routes/authRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const featureRoutes = require('./src/routes/featureRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const sliderRoutes = require('./src/routes/sliderRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const onboardingRoutes = require('./src/routes/onboardingRoutes');

// Initialize Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

// Health check route
app.get('/', (req, res) => {
    res.send('Foodlink Full Stack Backend is running');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/onboarding', onboardingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server listening on http://0.0.0.0:${PORT}`);
});
