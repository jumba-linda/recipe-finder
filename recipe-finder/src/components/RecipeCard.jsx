// src/components/RecipeCard.jsx
import React from 'react';

const RecipeCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(recipe);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={() => onSelect(recipe.idMeal)}
    >
      <div className="relative">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
          {recipe.strMeal}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.strCategory && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
              {recipe.strArea}
            </span>
          )}
        </div>
        
        <button 
          onClick={() => onSelect(recipe.idMeal)}
          className="w-full mt-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
