// document.addEventListener('DOMContentLoaded', () => {
//     const favoritesList = document.getElementById('favoritesList');
//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     function renderFavorites() {
//         favoritesList.innerHTML = '';
//         favorites.forEach(recipe => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//                 <h3>${recipe.name}</h3>
//                 <p><strong>Category:</strong> ${recipe.category}</p>
//                 <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
//                 <p><strong>Instructions:</strong> ${recipe.instructions}</p>
//             `;
//             favoritesList.appendChild(li);
//         });
//     }

//     renderFavorites();
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const favoritesList = document.getElementById('favoritesList');
//     let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     function renderFavorites() {
//         favoritesList.innerHTML = '';

//         if (favorites.length === 0) {
//             favoritesList.innerHTML = '<p>No favorite recipes yet.</p>';
//             return;
//         }

//         favorites.forEach(recipe => {
//             const li = document.createElement('li');
//             li.innerHTML = `
//                 <h3>${recipe.name}</h3>
//                 <p><strong>Category:</strong> ${recipe.category}</p>
//                 <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
//                 <p><strong>Instructions:</strong> ${recipe.instructions}</p>
//                 <button class="removeFavoriteBtn" data-id="${recipe.id}">Remove</button>
//             `;
//             favoritesList.appendChild(li);
//         });

//         attachRemoveHandlers();
//     }

//     function attachRemoveHandlers() {
//         document.querySelectorAll('.removeFavoriteBtn').forEach(button => {
//             button.addEventListener('click', (e) => {
//                 const id = +e.target.dataset.id;
//                 favorites = favorites.filter(recipe => recipe.id !== id);
//                 localStorage.setItem('favorites', JSON.stringify(favorites));
//                 renderFavorites();
//             });
//         });
//     }

//     renderFavorites();
// });



document.addEventListener('DOMContentLoaded', () => {
    if (typeof db === "undefined") {
        console.error("❌ Firestore is NOT initialized! Check firebaseConfig.js.");
        return;
    }

    const favoritesList = document.getElementById('favoritesList');

    function renderFavorites(snapshot) {
        favoritesList.innerHTML = '';

        if (snapshot.empty) {
            console.log("⚠ No favorite recipes found!");
            favoritesList.innerHTML = '<p>No favorite recipes yet.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const recipe = doc.data();
            recipe.id = doc.id;
            console.log("⭐ Favorite found:", JSON.stringify(recipe, null, 2));

            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients ? recipe.ingredients.join(', ') : 'No Ingredients'}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions || 'No Instructions'}</p>
                <button class="removeFavoriteBtn" data-id="${recipe.id}">❌ Remove</button>
            `;
            favoritesList.appendChild(li);
        });

        attachRemoveHandlers();
    }

    // ✅ Fetch favorites in real-time
    db.collection("favorites").onSnapshot(renderFavorites, (error) => {
        console.error("❌ Error fetching favorites:", error);
    });

    function attachRemoveHandlers() {
        document.querySelectorAll('.removeFavoriteBtn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await db.collection("favorites").doc(id).delete();
                console.log(`❌ Removed from favorites: ${id}`);
            });
        });
    }
});
