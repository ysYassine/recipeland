import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { useContext } from "react";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

export default function RecipeEdit({ recipe }) {
  const { handleRecipeSelect, handleRecipeChange } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex(
      (ingredient) => ingredient.id === id
    );
    newIngredients[index] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    });
  }

  function handleIngredientAdd() {
    const newIngredients = [
      ...recipe.ingredients,
      { id: uuidv4(), name: "", amount: "" },
    ];
    handleChange({ ingredients: newIngredients });
  }

  return (
    <div className="recipe-edit">
      <div style={{ textAlign: "right" }}>
        <button
          className="btn btn--primary"
          style={{ fontSize: ".8em" }}
          onClick={() => handleRecipeSelect()}
        >
          Close
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          autoFocus={window.screen.width > 740 ? true : false}
          onChange={(e) => handleChange({ name: e.target.value })}
        />
        <label className="recipe-edit__label" htmlFor="cook-time">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="cook-time"
          id="cook-time"
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
        />
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          type="number"
          min={0}
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value || 1) })
          }
        />
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <br />
      <div className="recipe-edit__ingredients-grid">
        <label>Name</label>
        <label>Amount</label>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            key={ingredient.id}
          />
        ))}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <button className="btn btn--primary" onClick={handleIngredientAdd}>
          Add Ingredients
        </button>
      </div>
    </div>
  );
}
