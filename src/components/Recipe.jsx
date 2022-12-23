import React, { useContext } from "react";
import IngredientsList from "./IngredientsList";
import { RecipeContext } from "./App";

function H3TitleWithIcon({ icon, title, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <i className={icon} style={{ fontSize: "30px" }} />
      <h3 className="recipe__header-name">{title}</h3>
    </div>
  );
}

function TitleWithIcon({ icon, title, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      <i className={icon} style={{ fontSize: "22px" }} />
      <span style={{ fontWeight: "bold" }}>{title}</span>
      {value && <span className="recipe__row__value">{value}</span>}
    </div>
  );
}

export default function Recipe(props) {
  const { id, name, cookTime, servings, instructions, ingredients } = props;
  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);
  return (
    <div className="recipe">
      <div className="recipe__header">
        <H3TitleWithIcon icon="bx bx-bowl-hot" title={name} />
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
        <TitleWithIcon
          icon="bx bx-time-five"
          title="Cook Time:"
          value={cookTime}
        />
      </div>
      <div className="recipe__row">
        <TitleWithIcon icon="bx bx-group" title="Servings:" value={servings} />
      </div>
      <div className="recipe__row">
        <TitleWithIcon icon="bx bx-book-content" title="Instructions:" />
        <div className="recipe__row__value recipe__instructions">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <TitleWithIcon icon="bx bx-bookmark-alt-minus" title="Ingredients:" />
        <div className="recipe__row__value">
          <IngredientsList ingredients={ingredients} />
        </div>
      </div>
    </div>
  );
}
