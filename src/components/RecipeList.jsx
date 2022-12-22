import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      <div className="add-recipe-btn__container">
        <button
          className="btn btn--primary mt-1 mr-1"
          onClick={handleRecipeAdd}
        >
          Add Recipe
        </button>
      </div>
      <div>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  );
}
