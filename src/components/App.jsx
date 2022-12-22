import React, { useState, useEffect, useRef } from "react";
import RecipeList from "./recipeList";
import "../css/app.css";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./../hooks/useLocalStorage";
import RecipeEdit from "./RecipeEdit";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

export const RecipeContext = React.createContext();
export const BASE = "recipeland";
const LOCAL_STORAGE_KEY = `${BASE}.recipes"`;

function App() {
  //Walkaround React strict mode
  // const dummyStrictModeRefresh = useRef(false);

  const [selectedRecipeId, setSelectedRecipeId] = useState();

  const [recipes, setRecipes] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    () => sampleRecipes
  );

  const selectedRecipe = recipes.find((item) => item.id === selectedRecipeId);

  const navigate = useNavigate();

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
    if (id != null) {
      navigate(`/${BASE}/${id}`);
    } else {
      navigate(`/${BASE}`);
    }
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((element) => element.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeAdd() {
    const newId = uuidv4();
    const newRecipe = {
      id: newId,
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    handleRecipeSelect(newRecipe.id);
    navigate(`/${BASE}/${newId}`);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
      navigate(`/${BASE}`);
    }
    setRecipes((prev) => prev.filter((element) => element.id !== id));
  }

  return (
    <RecipeContext.Provider
      value={{
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange,
      }}
    >
      <RecipeList recipes={recipes} />
      <Routes>
        <Route path={`/${BASE}`} element={null} />
        <Route
          path={`/${BASE}/:id`}
          element={
            selectedRecipe != null ? (
              <RecipeEdit recipe={selectedRecipe} />
            ) : (
              <Navigate to={`/${BASE}`} />
            )
          }
        />
      </Routes>
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Salad Pasta Farfella",
    servings: 2,
    cookTime: "1:45",
    instructions:
      '1. Cut Escalope into little pieces \n2.Cut pepper \n3.Cut onion & tomato into small pieces\n4.Cut garlic\n5.Mix all and add oil, water and "Korkob"',
    ingredients: [
      { id: 1, name: "Escalope", amount: "x2 pieces" },
      { id: 2, name: "Salad Peper", amount: "x2" },
      { id: 3, name: "Chilli Peper", amount: "x1" },
      { id: 4, name: "Tomato", amount: "x1" },
      { id: 5, name: "Onion", amount: "1/2" },
      { id: 6, name: "Garlic", amount: "x2 small" },
      { id: 7, name: "Korkob", amount: "1 Tbs" },
      { id: 8, name: "Oil", amount: "x6 Spoons" },
    ],
  },
  {
    id: 3,
    name: "Crêpe",
    servings: 6,
    cookTime: "0:45",
    instructions: "1. Mix\n2.Mix again",
    ingredients: [
      { id: 1, name: "Plain flour", amount: "250g" },
      { id: 2, name: "Milk", amount: "0.5L" },
      { id: 3, name: "Vanilla sugar", amount: "8g" },
      { id: 4, name: "Eggs", amount: "x3" },
      { id: 5, name: "Oil", amount: "2Tbs" },
    ],
  },
];

export default App;
