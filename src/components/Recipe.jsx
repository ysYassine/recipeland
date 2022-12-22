import React, { useContext } from "react";
import IngredientsList from "./IngredientsList";
import { RecipeContext } from "./App";

export default function Recipe(props) {
  const { id, name, cookTime, servings, instructions, ingredients } = props;
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__header-name">{name}</h3>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="btn btn--primary mr-1"
            onClick={() => handleRecipeSelect(id)}
          >
            Edit
          </button>
          <button
            className="btn btn--danger mr-1"
            onClick={() => handleRecipeDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__row__name">Cook Time:</span>
        <span className="recipe__row__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__row__name">Servings:</span>
        <span className="recipe__row__value">{servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__row__name">Instructions:</span>
        <div className="recipe__row__value recipe__instructions">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__row__name">Ingredients:</span>
        <div className="recipe__row__value">
          <IngredientsList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
