// src/components/FavoritesList.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

const FavoritesList = ({ favorites, onRecipeSelect, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          No favorite recipes yet. Start adding some!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Your Favorite Recipes ({favorites.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={onRecipeSelect}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
