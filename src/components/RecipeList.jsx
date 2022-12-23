import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "./App";

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);
  return (
    <div className="recipe-list">
      <div className="header__container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <i className="bx bxs-book" />
          <h1>RecipeLand</h1>
        </div>
        <button className="btn btn--positive mr-1" onClick={handleRecipeAdd}>
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
