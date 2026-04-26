require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/categoryModel');
const Feature = require('./src/models/featureModel');
const Article = require('./src/models/articleModel');
const Slider = require('./src/models/sliderModel');
const Notification = require('./src/models/notificationModel');
const connectDB = require('./src/config/db');

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing
        await Category.deleteMany();
        await Feature.deleteMany();
        await Article.deleteMany();
        await Slider.deleteMany();
        await Notification.deleteMany();

        const categories = [
            { name: 'Breakfast', icon_url: 'https://example.com/icons/breakfast.png' },
            { name: 'Lunch', icon_url: 'https://example.com/icons/lunch.png' },
            { name: 'Dinner', icon_url: 'https://example.com/icons/dinner.png' },
            { name: 'Snacks', icon_url: 'https://example.com/icons/snacks.png' },
            { name: 'Appetizers', icon_url: 'https://example.com/icons/appetizers.png' }
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

        await Category.insertMany(categories);
        await Feature.insertMany(features);
        await Article.insertMany(articles);
        await Slider.insertMany(sliders);

        console.log('Database Seeded Successfully with all features!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
