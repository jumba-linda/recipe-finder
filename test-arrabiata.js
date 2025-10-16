// Test the specific Arrabiata API endpoint
const testArrabiata = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    const data = await response.json();
    
    console.log('=== API Test Results ===');
    console.log('Status:', response.ok ? 'SUCCESS' : 'FAILED');
    console.log('Recipes found:', data.meals ? data.meals.length : 0);
    
    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0];
      console.log('\n=== Recipe Details ===');
      console.log('Name:', recipe.strMeal);
      console.log('Category:', recipe.strCategory);
      console.log('Area:', recipe.strArea);
      console.log('Image:', recipe.strMealThumb);
      console.log('Instructions preview:', recipe.strInstructions.substring(0, 100) + '...');
    }
  } catch (error) {
    console.error('API Error:', error);
  }
};

testArrabiata();
