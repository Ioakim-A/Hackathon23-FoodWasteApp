import React, { useState } from "react";
import "./css/Recipes.css";

function Recipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const YOUR_APP_ID = "0ab2f586";
  const YOUR_APP_KEY = "773e8bb9f8e3f7bd000ce0ec241c32e8";

  const handleSearch = () => {
    fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const recipesWithNutrition = data.hits.slice(0, 5).map((hit) => {
          const recipe = hit.recipe;
          const totalNutrients = recipe.totalNutrients;

          const nutrition = {
            calories: Math.round(totalNutrients.ENERC_KCAL.quantity),
            fat: Math.round(totalNutrients.FAT.quantity),
            carbs: Math.round(totalNutrients.CHOCDF.quantity),
            protein: Math.round(totalNutrients.PROCNT.quantity),
          };

          return {
            ...recipe,
            nutrition,
          };
        });

        setRecipes(recipesWithNutrition);

        // fetch carbon footprint for each recipe
        const recipeUrls = recipesWithNutrition.map((recipe) => recipe.url);

        Promise.all(
          recipeUrls.map((url) =>
            fetch(
              `https://api.eaternity.org/food/carbon?ingredient=${encodeURIComponent(
                url
              )}`
            )
          )
        )
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((carbonData) => {
            const recipesWithCarbon = recipesWithNutrition.map(
              (recipe, index) => ({
                ...recipe,
                carbonFootprint: Math.round(
                  carbonData[index]?.carbon_footprint_per_kg || 0
                ),
              })
            );

            setRecipes(recipesWithCarbon);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Recipes">
      <h1 className="Recipes-header">Search Recipes</h1>
      <div className="Recipes-search">
        <input
          type="text"
          placeholder="Enter a search query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="Recipes-search-input"
        />
        <button onClick={handleSearch} className="Recipes-search-button">
          Search
        </button>
      </div>
      <div className="Recipes-list">
        {recipes.map((recipe, index) => (
          <div key={index} className="Recipes-item">
            <img
              src={recipe.image}
              alt={recipe.label}
              className="Recipes-item-image"
            />
            <div className="Recipes-item-details">
              <h3 className="Recipes-item-title">{recipe.label}</h3>
              <ul className="Recipes-item-nutrition">
                <li>Calories: {recipe.nutrition.calories} Kcal</li>
                <li>Fat: {recipe.nutrition.fat}g</li>
                <li>Carbs: {recipe.nutrition.carbs}g</li>
                <li>Protein: {recipe.nutrition.protein}g</li>
                
              </ul>
              <ul className="Recipes-item-ingredients">
                {recipe.ingredientLines.map((ingredient, index) => (
                  <li key={index} className="Recipes-item-ingredient">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <a
                href={recipe.url}
                target="_blank"
                rel="noreferrer"
                className="Recipes-item-link"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
