require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3500;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/meals/generate', async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || typeof ingredients !== 'string') {
            return res.status(400).json({ error: 'Ingredients string is required' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
You are a master chef. Generate a delicious meal recipe that incorporates the following ingredients: ${ingredients}.
Feel free to add common pantry elements like salt, pepper, oil, water, etc.
You must return a JSON array containing a single meal object matching exactly this structure:
[
  {
    "category_id": 1, 
    "name": "Name of the meal",
    "image_url": null,
    "ingredients": ["ingredient 1", "ingredient 2", ...],
    "recipe": ["Step 1", "Step 2", ...],
    "user_id": null,
    "is_favorite": false,
    "date": null,
    "day": null,
    "source": "AI Generated",
    "type_id": 1
  }
]
- "category_id" should be an integer between 1 and 5.
- "type_id" should be an integer between 1 and 3.
- Ensure the result is valid JSON.
- Do NOT wrap the JSON in Markdown block quotes (like \`\`\`json). Return raw JSON text only.
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        let meals;
        try {
            meals = JSON.parse(responseText);
        } catch (e) {
            const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
            meals = JSON.parse(cleanedText);
        }

        res.json(meals);
    } catch (error) {
        console.error('Error generating meal:', error);
        res.status(500).json({ error: 'Failed to generate meal', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
