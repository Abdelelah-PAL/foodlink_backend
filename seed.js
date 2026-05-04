require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/userModel');
const authService = require('./src/services/authService');
const Category = require('./src/models/categoryModel');
const Feature = require('./src/models/featureModel');
const Article = require('./src/models/articleModel');
const Slider = require('./src/models/sliderModel');
const Notification = require('./src/models/notificationModel');
const Onboarding = require('./src/models/onboardingModel');
const connectDB = require('./src/config/db');

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing
        await Category.deleteMany();
        await User.deleteMany();
        await Feature.deleteMany();
        await Article.deleteMany();
        await Slider.deleteMany();
        await Notification.deleteMany();
        await Onboarding.deleteMany();

        const categories = [
            { id: 1, name: 'Breakfast', image_url: 'https://example.com/icons/breakfast.png', meals_name: 'Breakfast Meals' },
            { id: 2, name: 'Lunch', image_url: 'https://example.com/icons/lunch.png', meals_name: 'Lunch Meals' },
            { id: 3, name: 'Dinner', image_url: 'https://example.com/icons/dinner.png', meals_name: 'Dinner Meals' },
            { id: 4, name: 'Snacks', image_url: 'https://example.com/icons/snacks.png', meals_name: 'Snacks' },
            { id: 5, name: 'Appetizers', image_url: 'https://example.com/icons/appetizers.png', meals_name: 'Appetizers' }
        ];

        const features = [
            { 
                keyword: 'Healthy', 
                ar_image_url: 'https://example.com/ar/healthy.png',
                en_image_url: 'https://example.com/en/healthy.png',
                active: true,
                premium: false,
                user: true,
                cooker: true
            },
            { 
                keyword: 'Quick & Easy', 
                ar_image_url: 'https://example.com/ar/quick.png',
                en_image_url: 'https://example.com/en/quick.png',
                active: true,
                premium: false,
                user: true,
                cooker: true
            },
            { 
                keyword: 'Premium Recipes', 
                ar_image_url: 'https://example.com/ar/premium.png',
                en_image_url: 'https://example.com/en/premium.png',
                active: true,
                premium: true,
                user: true,
                cooker: false
            }
        ];

        const articles = [
            { image_url: 'https://example.com/articles/nutrition.jpg', url: 'https://foodlink.com/nutrition-101' },
            { image_url: 'https://example.com/articles/cooking.jpg', url: 'https://foodlink.com/mastering-chef-skills' }
        ];
        const sliders = [
            { imageUrl: 'https://example.com/sliders/promo1.jpg', active: true },
            { imageUrl: 'https://example.com/sliders/promo2.jpg', active: true }
        ];

        const onboarding = [
            {
                en_first_text_span: 'Welcome to ',
                ar_first_text_span: 'مرحباً بك في ',
                en_second_text_span: 'Foodlink',
                ar_second_text_span: 'فودلينك',
                en_third_text_span: ', your culinary companion.',
                ar_third_text_span: '، رفيقك في الطهي.',
                image_url: 'https://example.com/onboarding/welcome.png',
                order: 1
            },
            {
                en_first_text_span: 'Discover ',
                ar_first_text_span: 'اكتشف ',
                en_second_text_span: 'Amazing Recipes',
                ar_second_text_span: 'وصفات مذهلة',
                en_third_text_span: ' tailored for you.',
                ar_third_text_span: ' مصممة خصيصاً لك.',
                image_url: 'https://example.com/onboarding/discover.png',
                order: 2
            }
        ];

        // Create Admin User
        const adminPassword = await authService.hashPassword('admin123');
        const adminUser = {
            username: 'admin',
            email: 'admin@foodlink.com',
            name: 'System Admin',
            password: adminPassword,
            role: 'admin'
        };

        await User.create(adminUser);

        await Category.insertMany(categories);
        await Feature.insertMany(features);
        await Article.insertMany(articles);
        await Slider.insertMany(sliders);
        await Onboarding.insertMany(onboarding);

        console.log('Database Seeded Successfully with all features!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
