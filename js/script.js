// API Configuration
const APP_ID = 'YOUR_EDAMAM_APP_ID'; // You'll need to get this from Edamam
const APP_KEY = 'YOUR_EDAMAM_APP_KEY'; // You'll need to get this from Edamam
const API_URL = 'https://api.edamam.com/api/recipes/v2';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const recipesSection = document.getElementById('recipes-section');
const myRecipesSection = document.getElementById('my-recipes-section');
const addRecipeSection = document.getElementById('add-recipe-section');
const recipeForm = document.getElementById('recipe-form');
const myRecipesList = document.getElementById('my-recipes-list');

// Tab Navigation
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-500', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active', 'bg-blue-500', 'text-white');
        e.target.classList.remove('bg-gray-200', 'text-gray-700');
        
        // Show corresponding section
        const tabId = e.target.id;
        if (tabId === 'discover-tab') {
            showSection('search-section');
            showSection('recipes-section');
            hideSection('my-recipes-section');
            hideSection('add-recipe-section');
        } else if (tabId === 'my-recipes-tab') {
            hideSection('search-section');
            hideSection('recipes-section');
            showSection('my-recipes-section');
            hideSection('add-recipe-section');
            loadMyRecipes();
        } else if (tabId === 'add-recipe-tab') {
            hideSection('search-section');
            hideSection('recipes-section');
            hideSection('my-recipes-section');
            showSection('add-recipe-section');
        }
    });
});

function showSection(sectionId) {
    document.getElementById(sectionId)?.classList.remove('hidden');
}

function hideSection(sectionId) {
    document.getElementById(sectionId)?.classList.add('hidden');
}

// Search Recipes
searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes();
    }
});

async function searchRecipes() {
    const query = searchInput.value.trim();
    if (!query) return;

    try {
        const response = await fetch(
            `${API_URL}?type=public&q=${encodeURIComponent(query)}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesSection.innerHTML = '<p class="text-red-500">Error fetching recipes. Please try again.</p>';
    }
}

function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        recipesSection.innerHTML = '<p class="text-gray-500">No recipes found. Try a different search.</p>';
        return;
    }

    recipesSection.innerHTML = recipes.map(hit => {
        const recipe = hit.recipe;
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${recipe.image}" alt="${recipe.label}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-2">${recipe.label}</h3>
                    <p class="text-gray-600 mb-2">Source: ${recipe.source}</p>
                    <div class="flex justify-between text-sm text-gray-500 mb-4">
                        <span>${Math.round(recipe.calories)} calories</span>
                        <span>${recipe.ingredients.length} ingredients</span>
                    </div>
                    <div class="space-y-2">
                        <button onclick="viewRecipe('${recipe.uri}')" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            View Recipe
                        </button>
                        <button onclick="saveRecipe(${JSON.stringify(recipe).replace(/'/g, "\\'")})" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            Save to My Recipes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// My Recipes functionality
function saveRecipe(recipe) {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
    myRecipes.push(recipe);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
    alert('Recipe saved to your collection!');
}

function loadMyRecipes() {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
    
    if (myRecipes.length === 0) {
        myRecipesList.innerHTML = '<p class="text-gray-500">No custom recipes yet. Start by adding your first recipe!</p>';
        return;
    }

    myRecipesList.innerHTML = myRecipes.map((recipe, index) => `
        <div class="border-b border-gray-200 py-4">
            <h3 class="text-lg font-bold">${recipe.label}</h3>
            <p class="text-gray-600">Source: ${recipe.source}</p>
            <button onclick="removeRecipe(${index})" class="text-red-500 hover:text-red-700 mt-2">
                Remove
            </button>
        </div>
    `).join('');
}

function removeRecipe(index) {
    const myRecipes = JSON.parse(localStorage.getItem('myRecipes') || '[]');
    myRecipes.splice(index, 1);
    localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
    loadMyRecipes();
}

// Add Custom Recipe
recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;
    
    if (!title || !ingredients || !instructions) {
        alert('Please fill in all fields');
        return;
    }
    
    const customRecipe = {
        label: title,
        ingredients: ingredients.split('\n').map(ing => ing.trim()).filter(ing => ing),
        instructions: instructions,
        source: 'Custom Recipe',
        image: 'https://via.placeholder.com/300x200?text=Custom+Recipe'
    };
    
    saveRecipe(customRecipe);
    recipeForm.reset();
    alert('Recipe added successfully!');
});

// View Recipe Details (simplified)
function viewRecipe(recipeUri) {
    // In a real app, you'd fetch detailed recipe info
    alert('Recipe details would open here. In a full implementation, this would show detailed instructions and ingredients.');
}
