// src/utils/api.js
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Search recipes error:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error('Failed to fetch recipe');
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Get recipe by ID error:', error);
    throw error;
  }
};

export const getRecipeCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
};
