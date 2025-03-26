document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipeList');
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // function renderRecipes() {
    //     recipeList.innerHTML = '';
    //     recipes.forEach(recipe => {
    //         const li = document.createElement('li');
    //         li.innerHTML = `
    //             <h3>${recipe.name}</h3>
    //             <p><strong>Category:</strong> ${recipe.category}</p>
    //             <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
    //             <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    //         `;
    //         recipeList.appendChild(li);
    //     });
    // }



//


    // Render Recipes
    function renderRecipes() {
        recipeList.innerHTML = '';
        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchBox.value.toLowerCase()) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchBox.value.toLowerCase()));
            const matchesCategory = filterCategory.value === 'All' || recipe.category === filterCategory.value;
            return matchesSearch && matchesCategory;
        });

        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button class="editBtn" data-id="${recipe.id}">Edit</button>
                <button class="deleteBtn" data-id="${recipe.id}">Delete</button>
            `;
            recipeList.appendChild(li);
        });
    }

    // Search and Filter
    searchBox.addEventListener('input', renderRecipes);
    filterCategory.addEventListener('change', renderRecipes);

    // Edit and Delete Handlers
    recipeList.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            const id = +e.target.dataset.id;
            const recipe = recipes.find(r => r.id === id);
            document.getElementById('recipeName').value = recipe.name;
            document.getElementById('category').value = recipe.category;
            document.getElementById('ingredients').value = recipe.ingredients.join(', ');
            document.getElementById('instructions').value = recipe.instructions;

            recipes = recipes.filter(r => r.id !== id); // Remove old recipe before saving the edited one
            recipeFormSection.classList.remove('hidden');
        }

        if (e.target.classList.contains('deleteBtn')) {
            const id = +e.target.dataset.id;
            recipes = recipes.filter(r => r.id !== id);
            localStorage.setItem('recipes', JSON.stringify(recipes)); // Update local storage
            renderRecipes();
        }
    });
    
    renderRecipes();
});