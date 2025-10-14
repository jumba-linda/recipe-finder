// src/components/RecipeDetails.jsx
import React from 'react';

const RecipeDetails = ({ recipe, onBack, isFavorite, onToggleFavorite }) => {
  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  // Format instructions
  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split('\n').filter(step => step.trim())
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        ← Back to Results
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {recipe.strMeal}
                </h1>
                <div className="flex gap-4">
                  {recipe.strCategory && (
                    <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                      {recipe.strCategory}
                    </span>
                  )}
                  {recipe.strArea && (
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                      {recipe.strArea}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onToggleFavorite}
                className="text-2xl hover:scale-110 transition-transform"
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Ingredients */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Ingredients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{item.measure}</strong> {item.ingredient}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              {instructions.length > 0 ? (
                <ol className="list-decimal list-inside space-y-3">
                  {instructions.map((step, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No instructions available for this recipe.
                </p>
              )}
            </div>
          </section>

          {/* Video & Source */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* YouTube Video */}
            {recipe.strYoutube && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Video Tutorial
                </h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={recipe.strYoutube.replace('watch?v=', 'embed/')}
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                    title={`${recipe.strMeal} video tutorial`}
                  />
                </div>
              </section>
            )}

            {/* Source Link */}
            {recipe.strSource && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Source
                </h2>
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  View Original Recipe
                </a>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
