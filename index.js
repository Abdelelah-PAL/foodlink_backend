require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;
if (!process.env.GEMINI_API_KEY) {
    console.error('CRITICAL ERROR: GEMINI_API_KEY is not defined in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.post('/api/meals/generate', async (req, res) => {
    try {
        console.log('Incoming request to /api/meals/generate:', req.body);
        const { ingredients } = req.body;

        if (!ingredients || typeof ingredients !== 'string') {
            return res.status(400).json({ error: 'Ingredients string is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
You are a master chef. Generate a delicious meal recipe that incorporates the following ingredients: ${ingredients}.
Feel free to add common pantry elements like salt, pepper, oil, water, etc.
You must return a JSON array containing a single meal object matching exactly this structure:
[
  {
    "category_id": 1, 
    "name": "Name of the meal",
    "ingredients": ["ingredient 1", "ingredient 2", ...],
    "recipe": ["Step 1", "Step 2", ...],
    "user_id": null,
    "is_favorite": false,
    "source": "AI Generated",
    "type_id": 1
  }
]
- "category_id" should be an integer between 1 and 5.
- "type_id" should be an integer between 1 and 3.
- Ensure the result is valid JSON.
- Do NOT wrap the JSON in Markdown block quotes (like \`\`\`json). Return raw JSON text only.
- IMPORTANT: The translation for 'name', 'ingredients', and 'recipe' must match the language of the provided ingredients (${ingredients}).
`;

        console.log('Generating content with prompt length:', prompt.length);
        const result = await model.generateContent(prompt);
        console.log('Gemini API call completed.');
        const responseText = result.response.text().trim();

        let meals;
        try {
            meals = JSON.parse(responseText);
        } catch (e) {
            console.warn('JSON parse failed, attempting cleanup.');
            const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
            meals = JSON.parse(cleanedText);
        }

        console.log('Successfully generated meal:', meals[0]?.name);
        res.json(meals);
    } catch (error) {
        console.error('Error generating meal:', error);
        let errorMessage = error.message;
        if (errorMessage.includes('API key not valid')) {
            errorMessage = 'Invalid Gemini API Key. Please update your .env file with a valid key from Google AI Studio.';
        }
        res.status(500).json({ error: 'Failed to generate meal', details: errorMessage });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server listening on http://0.0.0.0:${PORT}`);
});
