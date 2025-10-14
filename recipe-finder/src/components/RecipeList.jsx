// src/components/RecipeList.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, searchQuery, onRecipeSelect, isFavorite, onToggleFavorite }) => {
  if (searchQuery && recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          No recipes found for "{searchQuery}". Try a different search term.
        </p>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Search for recipes to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Search Results for "{searchQuery}" ({recipes.length} recipes)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={onRecipeSelect}
            isFavorite={isFavorite(recipe.idMeal)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
