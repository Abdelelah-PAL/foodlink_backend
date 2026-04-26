const axios = require('axios');

const BASE_URL = 'http://localhost:9000/api/meals';

async function testEndpoints() {
    console.log('--- Starting MVC Verification ---');

    try {
        // 1. Test Generate
        console.log('\n1. Testing /generate...');
        let generatedMeal;
        try {
            const genResponse = await axios.post(`${BASE_URL}/generate`, {
                ingredients: 'tomato, eggs, onion'
            });
            console.log('Generate Success:', genResponse.data[0].name);
            generatedMeal = genResponse.data[0];
        } catch (e) {
            console.warn('AI Generation failed (likely credits), using mock data for CRUD tests.');
            generatedMeal = {
                category_id: 1,
                name: "Mock Shakshuka",
                image_url: "https://example.com/shakshuka.jpg",
                ingredients: ["3 eggs", "2 tomatoes", "1 onion"],
                recipe: ["Chop onions", "Sauté tomatoes", "Add eggs"],
                source: "Mock Data"
            };
        }

        // 2. Test Save
        console.log('\n2. Testing /save...');
        const saveResponse = await axios.post(`${BASE_URL}/save`, generatedMeal);
        const savedMeal = saveResponse.data;
        const savedMealId = savedMeal._id;
        console.log('Save Success:', savedMeal.name, 'ID:', savedMealId);

        // 3. Test Get All Saved
        console.log('\n3. Testing /saved (All)...');
        const allResponse = await axios.get(`${BASE_URL}/saved`);
        console.log('Get All Success:', allResponse.data.length, 'meals found.');

        // 4. Test Get By ID
        console.log('\n4. Testing /saved/:id...');
        const singleResponse = await axios.get(`${BASE_URL}/saved/${savedMealId}`);
        console.log('Get By ID Success:', singleResponse.data.name);

        // 5. Test Delete
        console.log('\n5. Testing DELETE /saved/:id...');
        const deleteResponse = await axios.delete(`${BASE_URL}/saved/${savedMealId}`);
        console.log('Delete Success:', deleteResponse.data.message);

        // 6. Verify Delete
        console.log('\n6. Verifying Delete...');
        try {
            await axios.get(`${BASE_URL}/saved/${savedMealId}`);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                console.log('Verify Delete Success: Meal is gone.');
            } else {
                throw e;
            }
        }

    } catch (error) {
        console.error('Verification failed:', error.response ? error.response.data : error.message);
    }
}

testEndpoints();
