// document.addEventListener('DOMContentLoaded', () => {
//     const recipeForm = document.getElementById('recipeForm');
//     let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

//     recipeForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const recipe = {
//             id: Date.now(),
//             name: document.getElementById('recipeName').value,
//             category: document.getElementById('category').value,
//             ingredients: document.getElementById('ingredients').value.split(',').map(ing => ing.trim()),
//             instructions: document.getElementById('instructions').value,
//         };

//         recipes.push(recipe);
//         localStorage.setItem('recipes', JSON.stringify(recipes));
//         alert('Recipe added successfully!');
//         recipeForm.reset();
//     });
// });




// // new code 
// // 🔧 Suggested Improvements:
// // Better Input Validation: Prevent users from adding blank or duplicate recipes.
// // Feedback Message Instead of Alert: Replace alert() with a more user-friendly success message.
// // Ensure Ingredients Are Not Empty: Remove empty strings from the array.




// // ++++++++++++++++++++++++++++++++++++++++++++++++



// // document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
// //     e.preventDefault();

// //     const name = document.getElementById('recipeName').value;
// //     const category = document.getElementById('category').value;
// //     const ingredients = document.getElementById('ingredients').value.split(',').map(ing => ing.trim());
// //     const instructions = document.getElementById('instructions').value;

// //     const newRecipe = { name, category, ingredients, instructions };

// //     // Save to Firestore
// //     const db = firebase.firestore();
// //     await db.collection('recipes').add(newRecipe);

// //     alert('Recipe added successfully!');
// //     window.location.href = 'viewrecipes.html';
// // });


// // +++++++++++++++++++++++++++++++++++++++++++++++++++++





// document.addEventListener('DOMContentLoaded', () => {
//     const recipeForm = document.getElementById('recipeForm');
//     let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

//     recipeForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const name = document.getElementById('recipeName').value.trim();
//         const category = document.getElementById('category').value;
//         const ingredients = document.getElementById('ingredients').value
//             .split(',')
//             .map(ing => ing.trim())
//             .filter(ing => ing !== ""); // Remove empty strings
//         const instructions = document.getElementById('instructions').value.trim();

//         // Input Validation
//         if (!name || !category || ingredients.length === 0 || !instructions) {
//             displayMessage('Please fill in all fields properly.', 'error');
//             return;
//         }

//         // Check for Duplicate Recipes
//         if (recipes.some(recipe => recipe.name.toLowerCase() === name.toLowerCase())) {
//             displayMessage('Recipe already exists!', 'error');
//             return;
//         }

//         const recipe = {
//             id: Date.now(),
//             name,
//             category,
//             ingredients,
//             instructions,
//         };

//         recipes.push(recipe);
//         localStorage.setItem('recipes', JSON.stringify(recipes));

//         displayMessage('Recipe added successfully!', 'success');

//         recipeForm.reset();
//     });

//     function displayMessage(message, type) {
//         const msgDiv = document.createElement('div');
//         msgDiv.textContent = message;
//         msgDiv.className = `message ${type}`;
//         document.body.appendChild(msgDiv);

//         setTimeout(() => msgDiv.remove(), 3000); // Message disappears after 3s
//     }
// });



//finallll


document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');

    recipeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const recipe = {
            name: document.getElementById('recipeName').value.trim(),
            category: document.getElementById('category').value,
            ingredients: document.getElementById('ingredients').value.split(',').map(ing => ing.trim()).filter(ing => ing !== ""),
            instructions: document.getElementById('instructions').value.trim(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!recipe.name || !recipe.category || recipe.ingredients.length === 0 || !recipe.instructions) {
            displayMessage('Please fill in all fields properly.', 'error');
            return;
        }

        try {
            const docRef = await db.collection("recipes").add(recipe);
            console.log("✅ Recipe added successfully! ID:", docRef.id);
            displayMessage('Recipe added successfully!', 'success');
            recipeForm.reset();
        } catch (error) {
            console.error("❌ Error adding recipe:", error);
            displayMessage('Error adding recipe: ' + error.message, 'error');
        }
    });

    function displayMessage(message, type) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        msgDiv.className = `message ${type}`;
        document.body.appendChild(msgDiv);

        setTimeout(() => msgDiv.remove(), 3000);
    }
});