import React from "react";
import Ingredient from "./Ingredient";

export default function IngredientsList({ ingredients }) {
  const ingredientsElements = ingredients.map((ingredient) => (
    <Ingredient key={ingredient.id} {...ingredient} />
  ));
  return <div className="ingredients__grid">{ingredientsElements}</div>;
}
