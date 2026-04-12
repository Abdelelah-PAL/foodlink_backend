require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Not needed for listing but good for ref
        
        // Use the native fetch or the SDK if it has listModels
        // The SDK might not have a direct listModels exposed in the same way, 
        // but we can try to fetch from the URL mentioned in the error.
        
        console.log('Fetching available models...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            console.log('Available Models:');
            data.models.forEach(m => console.log(` - ${m.name}`));
        } else {
            console.log('No models found or error:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

listModels();
