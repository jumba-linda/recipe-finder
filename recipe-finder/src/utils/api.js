// src/utils/api.js
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Search recipes error:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  } catch (error) {
    console.error('Get recipe by ID error:', error);
    throw error;
  }
};

export const getRecipeCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error('Get categories error:', error);
    throw error;
  }
};
