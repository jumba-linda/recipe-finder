// src/App.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import { searchRecipes, getRecipeById } from './utils/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setSearchQuery(query);
    
    try {
      const results = await searchRecipes(query);
      if (results && results.length > 0) {
        setRecipes(results);
        setSelectedRecipe(null);
      } else {
        setRecipes([]);
        setError('No recipes found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeSelect = async (recipeId) => {
    setLoading(true);
    try {
      const recipe = await getRecipeById(recipeId);
      setSelectedRecipe(recipe);
    } catch (err) {
      setError('Failed to load recipe details.');
      console.error('Recipe details error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🍳 Recipe Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover delicious recipes from around the world
          </p>
          
          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {showFavorites ? 'Show All Recipes' : `Show Favorites (${favorites.length})`}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading recipes...</p>
          </div>
        )}

        {/* Main Content */}
        <main>
          {selectedRecipe ? (
            <RecipeDetails 
              recipe={selectedRecipe} 
              onBack={handleBackToList}
              isFavorite={isFavorite(selectedRecipe.idMeal)}
              onToggleFavorite={() => toggleFavorite(selectedRecipe)}
            />
          ) : showFavorites ? (
            <FavoritesList 
              favorites={favorites}
              onRecipeSelect={handleRecipeSelect}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <RecipeList 
              recipes={recipes}
              searchQuery={searchQuery}
              onRecipeSelect={handleRecipeSelect}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
