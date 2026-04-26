const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
    console.error('CRITICAL ERROR: GEMINI_API_KEY is not defined in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = (modelName = "gemini-flash-latest") => {
    return genAI.getGenerativeModel({ model: modelName });
};

module.exports = {
    getGeminiModel
};
