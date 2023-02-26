import React, { useState } from "react";
import axios from "axios";
import "./css/Recipes.css";

function Recipes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const appId = process.env.REACT_APP_RECIPES_API_ID;
  const appKey = process.env.REACT_APP_RECIPES_API_KEY;
  const searchRecipes = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}&beta=true`
      );
      const newRecipes = response.data.hits.slice(0, 5).map((hit) => {
        const { label, image, ingredientLines, url } = hit.recipe;
        const { ENERC_KCAL, PROCNT, FAT, CHOCDF } = hit.recipe.totalNutrients;
        const co2EmissionsClass = hit.recipe.co2EmissionsClass;
        return {
          label,
          image,
          ingredientLines,
          nutrients: {
            calories: Math.round(ENERC_KCAL.quantity),
            protein: Math.round(PROCNT.quantity),
            fat: Math.round(FAT.quantity),
            carbs: Math.round(CHOCDF.quantity),
          },
          carbonRating: co2EmissionsClass,
          url,
        };
      });
      // Sort recipes by carbon rating
      newRecipes.sort((recipe1, recipe2) => {
        // Define a mapping of carbon ratings to numerical values for comparison
        const carbonRatingOrder = {
          "A+": 0,
          A: 1,
          B: 2,
          C: 3,
          D: 4,
          E: 5,
          F: 6,
          G: 7,
        };
        // Compare the carbon ratings of the two recipes
        return carbonRatingOrder[recipe1.carbonRating] - carbonRatingOrder[recipe2.carbonRating];
      });
      setRecipes(newRecipes);
    //   setSearchQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipes">
      <h1>Find recipes based on your fridge contents!</h1>
      <form onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Search Recipes by Ingredients"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {recipes.map((recipe, index) => (
        <div key={index} className="recipe">
          <h3>{recipe.label}</h3>
          <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            <img src={recipe.image} alt={recipe.label} />
          </a>
          <ul>
            {recipe.ingredientLines.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          <div className="nutrition">
            <h4>Nutritional Values:</h4>
            <ul>
              <li>Calories: {recipe.nutrients.calories} kcal</li>
              <li>Protein: {recipe.nutrients.protein} g</li>
              <li>Fat: {recipe.nutrients.fat} g</li>
              <li>Carbohydrates: {recipe.nutrients.carbs} g</li>
            </ul>
          </div>
          <div className={`carbon-rating carbon-rating-${recipe.carbonRating}`}>
            <h4>Carbon Rating:</h4>
            <p
              className={`carbon-rating-text ${
                recipe.carbonRating === "A+" || recipe.carbonRating === "A"
                  ? "carbon-rating-low"
                  : recipe.carbonRating === "B" || recipe.carbonRating === "C"
                  ? "carbon-rating-medium"
                  : "carbon-rating-high"
              }`}
            >
              {recipe.carbonRating}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
