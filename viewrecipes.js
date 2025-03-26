


// document.addEventListener('DOMContentLoaded', async () => {
//     const recipeList = document.getElementById('recipeList');
//     const searchBox = document.getElementById('searchBox');
//     const filterCategory = document.getElementById('filterCategory');
//     const editModal = document.getElementById('editModal');
//     const saveChangesBtn = document.getElementById('saveChangesBtn');
//     const cancelBtn = document.getElementById('cancelBtn');

//     let editingRecipeId = null;

//     async function fetchFavorites() {
//         const favorites = new Set();
//         const snapshot = await db.collection("favorites").get();
//         snapshot.forEach(doc => {
//             favorites.add(doc.id);
//         });
//         return favorites;
//     }

//     async function renderRecipes(snapshot) {
//         recipeList.innerHTML = '';
//         const favoriteSet = await fetchFavorites();

//         if (snapshot.empty) {
//             console.log("⚠ No recipes found in Firestore!");
//             recipeList.innerHTML = '<p>No recipes available.</p>';
//             return;
//         }

//         snapshot.forEach(doc => {
//             const recipe = doc.data();
//             recipe.id = doc.id;
//             console.log("📌 Recipe found:", JSON.stringify(recipe, null, 2));

//             const isFavorited = favoriteSet.has(recipe.id);

//             const li = document.createElement('li');
//             li.classList.add('recipe-item');
//             li.dataset.name = recipe.name.toLowerCase();
//             li.dataset.category = recipe.category;

//             li.innerHTML = `
//                 <h3>${recipe.name}</h3>
//                 <p><strong>Category:</strong> ${recipe.category}</p>
//                 <p><strong>Ingredients:</strong> ${recipe.ingredients ? recipe.ingredients.join(', ') : 'No Ingredients'}</p>
//                 <p><strong>Instructions:</strong> ${recipe.instructions || 'No Instructions'}</p>
//                 <button class="favoriteBtn" data-id="${recipe.id}">${isFavorited ? '💛 Favorited' : '❤️ Favorite'}</button>
//                 <button class="editBtn" data-id="${recipe.id}">Edit</button>
//                 <button class="deleteBtn" data-id="${recipe.id}">Delete</button>
//             `;
//             recipeList.appendChild(li);
//         });

//         attachHandlers();
//     }

//     db.collection("recipes").orderBy("timestamp", "desc").onSnapshot(renderRecipes, (error) => {
//         console.error("❌ Error fetching recipes:", error);
//     });

//     function attachHandlers() {
//         document.querySelectorAll('.favoriteBtn').forEach(button => {
//             button.addEventListener('click', async (e) => {
//                 const id = e.target.dataset.id;
//                 const favDoc = await db.collection("favorites").doc(id).get();

//                 if (favDoc.exists) {
//                     await db.collection("favorites").doc(id).delete();
//                     console.log(`❌ Removed from favorites: ${id}`);
//                     e.target.textContent = '❤️ Favorite';
//                     displayMessage('Recipe removed from favorites.', 'error');
//                 } else {
//                     const doc = await db.collection("recipes").doc(id).get();
//                     if (doc.exists) {
//                         await db.collection("favorites").doc(id).set(doc.data());
//                         console.log(`⭐ Recipe added to favorites: ${id}`, doc.data());
//                         e.target.textContent = '💛 Favorited';
//                         displayMessage('Recipe added to favorites!', 'success');
//                     }
//                 }
//             });
//         });

//         document.querySelectorAll('.deleteBtn').forEach(button => {
//             button.addEventListener('click', async (e) => {
//                 const id = e.target.dataset.id;
//                 try {
//                     await db.collection("recipes").doc(id).delete();
//                     console.log(`🗑️ Deleted recipe with ID: ${id}`);
//                 } catch (error) {
//                     console.error("❌ Error deleting recipe:", error);
//                 }
//             });
//         });

//         document.querySelectorAll('.editBtn').forEach(button => {
//             button.addEventListener('click', async (e) => {
//                 const id = e.target.dataset.id;
//                 openEditModal(id);
//             });
//         });
//     }

//     function openEditModal(id) {
//         db.collection("recipes").doc(id).get().then((doc) => {
//             if (doc.exists) {
//                 const recipe = doc.data();
//                 document.getElementById('editRecipeName').value = recipe.name;
//                 document.getElementById('editCategory').value = recipe.category;
//                 document.getElementById('editIngredients').value = recipe.ingredients.join(', ');
//                 document.getElementById('editInstructions').value = recipe.instructions;

//                 editingRecipeId = id;
//                 editModal.style.display = 'block';
//             } else {
//                 console.error("❌ Recipe not found for editing.");
//             }
//         });
//     }

//     saveChangesBtn.addEventListener('click', async () => {
//         if (!editingRecipeId) return;

//         const updatedRecipe = {
//             name: document.getElementById('editRecipeName').value.trim(),
//             category: document.getElementById('editCategory').value.trim(),
//             ingredients: document.getElementById('editIngredients').value.split(',').map(ing => ing.trim()),
//             instructions: document.getElementById('editInstructions').value.trim(),
//         };

//         try {
//             await db.collection("recipes").doc(editingRecipeId).update(updatedRecipe);
//             console.log(`✅ Recipe updated: ${editingRecipeId}`);
//             displayMessage('Recipe updated successfully!', 'success');
//             editModal.style.display = 'none';
//         } catch (error) {
//             console.error("❌ Error updating recipe:", error);
//             displayMessage('Error updating recipe.', 'error');
//         }
//     });

//     cancelBtn.addEventListener('click', () => {
//         editModal.style.display = 'none';
//     });

//     function displayMessage(message, type) {
//         const msgDiv = document.createElement('div');
//         msgDiv.textContent = message;
//         msgDiv.className = `message ${type}`;
//         document.body.appendChild(msgDiv);
//         setTimeout(() => msgDiv.remove(), 3000);
//     }

//     // ✅ SEARCH FUNCTIONALITY
//     searchBox.addEventListener('input', () => {
//         const searchTerm = searchBox.value.toLowerCase();
//         document.querySelectorAll('.recipe-item').forEach(recipe => {
//             const name = recipe.dataset.name;
//             recipe.style.display = name.includes(searchTerm) ? 'block' : 'none';
//         });
//     });

//     // ✅ FILTER FUNCTIONALITY
//     filterCategory.addEventListener('change', () => {
//         const selectedCategory = filterCategory.value;
//         document.querySelectorAll('.recipe-item').forEach(recipe => {
//             const category = recipe.dataset.category;
//             recipe.style.display = (selectedCategory === 'All' || category === selectedCategory) ? 'block' : 'none';
//         });
//     });
// });

// ✅ Render all recipes correctly
function renderAllRecipes(snapshot) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = '';

    snapshot.forEach(doc => {
        const recipe = doc.data();
        recipe.id = doc.id;

        const li = document.createElement('li');
        li.classList.add('recipe-item');
        li.dataset.name = recipe.name.toLowerCase();
        li.dataset.category = recipe.category;

        li.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients ? recipe.ingredients.join(', ') : 'No Ingredients'}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions || 'No Instructions'}</p>
            <button class="favoriteBtn" data-id="${recipe.id}">${recipe.isFavorited ? '💛 Favorited' : '❤️ Favorite'}</button>
            <button class="editBtn" data-id="${recipe.id}">Edit</button>
            <button class="deleteBtn" data-id="${recipe.id}">Delete</button>
            <button class="shareBtn" data-id="${recipe.id}">🔗 Share</button>
        `;
        recipeList.appendChild(li);
    });

    // ✅ Attach handlers after rendering
    attachHandlers(); 
    attachShareHandlers();  // Attach share button handler
}

// ✅ Attach event handlers to all buttons after rendering
function attachHandlers() {
    // ✅ Favorite button handler
    document.querySelectorAll('.favoriteBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const favDoc = await db.collection("favorites").doc(id).get();

            if (favDoc.exists) {
                await db.collection("favorites").doc(id).delete();
                e.target.textContent = '❤️ Favorite';
                console.log(`❌ Removed from favorites: ${id}`);
            } else {
                const doc = await db.collection("recipes").doc(id).get();
                if (doc.exists) {
                    await db.collection("favorites").doc(id).set(doc.data());
                    e.target.textContent = '💛 Favorited';
                    console.log(`⭐ Recipe added to favorites: ${id}`);
                }
            }
        });
    });

    // ✅ Delete button handler
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            try {
                await db.collection("recipes").doc(id).delete();
                console.log(`🗑️ Deleted recipe with ID: ${id}`);
            } catch (error) {
                console.error("❌ Error deleting recipe:", error);
            }
        });
    });

    // ✅ Edit button handler
    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            openEditModal(id);  // Opens the modal to edit the recipe
        });
    });
}

// ✅ Attach event handlers to Share button only
function attachShareHandlers() {
    document.querySelectorAll('.shareBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const shareUrl = `${window.location.origin}/viewrecipes.html?id=${id}`;

            if (navigator.share) {
                navigator.share({
                    title: "Check out this recipe!",
                    url: shareUrl
                }).then(() => {
                    console.log("✅ Recipe shared successfully!");
                }).catch((err) => console.error("❌ Error sharing:", err));
            } else {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert("✅ Link copied to clipboard!");
                }).catch(err => {
                    console.error("❌ Failed to copy:", err);
                });
            }
        });
    });
}

// ✅ Open Edit Modal (existing function)
function openEditModal(id) {
    db.collection("recipes").doc(id).get().then((doc) => {
        if (doc.exists) {
            const recipe = doc.data();
            document.getElementById('editRecipeName').value = recipe.name;
            document.getElementById('editCategory').value = recipe.category;
            document.getElementById('editIngredients').value = recipe.ingredients.join(', ');
            document.getElementById('editInstructions').value = recipe.instructions;

            editingRecipeId = id;
            editModal.style.display = 'block';
        } else {
            console.error("❌ Recipe not found for editing.");
        }
    });
}

// ✅ Call fetchSharedRecipe on page load
document.addEventListener('DOMContentLoaded', async () => {
    await fetchSharedRecipe();
});

// ✅ Fetch and render the shared recipe if opened via link
async function fetchSharedRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (recipeId) {
        try {
            const doc = await db.collection("recipes").doc(recipeId).get();
            if (doc.exists) {
                const recipe = doc.data();
                renderSingleRecipe(recipe);  // Render only the shared recipe
            } else {
                console.error("❌ Recipe not found.");
                document.getElementById('recipeList').innerHTML = '<p>Recipe not found.</p>';
            }
        } catch (error) {
            console.error("❌ Error fetching recipe:", error);
        }
    } else {
        // ✅ Fallback to existing logic if no ID is found
        db.collection("recipes").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            if (snapshot.empty) {
                document.getElementById('recipeList').innerHTML = '<p>No recipes available.</p>';
                return;
            }
            renderAllRecipes(snapshot);
        }, (error) => {
            console.error("❌ Error fetching recipes:", error);
        });
    }
}

// ✅ Render a single recipe if shared via link
function renderSingleRecipe(recipe) {
    const recipeList = document.getElementById('recipeList');
    recipeList.innerHTML = `
        <li class="recipe-item">
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients ? recipe.ingredients.join(', ') : 'No Ingredients'}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions || 'No Instructions'}</p>
        </li>
    `;
}
