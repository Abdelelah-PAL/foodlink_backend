const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodlink');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Drop old unique indexes to allow dual-role records
        try {
            await mongoose.connection.db.collection('users').dropIndex('username_1');
            console.log('Successfully dropped unique username index');
        } catch (e) {}

        try {
            await mongoose.connection.db.collection('users').dropIndex('email_1');
            console.log('Successfully dropped unique email index (now using compound index)');
        } catch (e) {}
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
