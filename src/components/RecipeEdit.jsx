import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { useContext } from "react";
import { RecipeContext } from "./App";
import { v4 as uuidv4 } from "uuid";

function LabelWithIcon({ icon, title, htmlFor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      <i className={icon} style={{ fontSize: "22px" }} />
      <label
        style={{ fontWeight: "bold" }}
        htmlFor={htmlFor}
        className="recipe__row__name"
      >
        {title}
      </label>
    </div>
  );
}

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
      <button
        className="btn btn--primary"
        style={{ marginLeft: "auto" }}
        onClick={() => handleRecipeSelect()}
      >
        Close
      </button>
      <div className="recipe-edit__details-grid">
        <LabelWithIcon icon="bx bx-bowl-hot" title="Name" htmlFor="name" />
        <input
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          autoFocus={window.screen.width > 740 ? true : false}
          onChange={(e) => handleChange({ name: e.target.value })}
        />
        <LabelWithIcon
          icon="bx bx-time-five"
          title="Cook Time"
          htmlFor="cook-time"
        />
        <input
          className="recipe-edit__input"
          type="text"
          name="cook-time"
          id="cook-time"
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
        />
        <LabelWithIcon icon="bx bx-group" title="Servings" htmlFor="servings" />
        <input
          className="recipe-edit__input"
          type="number"
          min={0}
          name="servings"
          id="servings"
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value || 0) })
          }
        />
        <LabelWithIcon
          icon="bx bx-book-content"
          title="Instructions"
          htmlFor="instructions"
        />
        <textarea
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          value={recipe.instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <LabelWithIcon icon="bx bx-bookmark-alt-minus" title="Ingredients" />
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
      <button
        className="btn btn--positive"
        onClick={handleIngredientAdd}
        style={{ margin: "auto" }}
      >
        Add Ingredients
      </button>
    </div>
  );
}
