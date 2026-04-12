require('dotenv').config();
console.log('API Key Length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 'NULL');
console.log('Model Name: gemini-1.5-flash');
