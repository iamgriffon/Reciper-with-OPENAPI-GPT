import { Navbar } from "@/components/navbar";
import { RecipeTag } from "@/components/recipe_tag";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { fetch } from "@/server/api";

type Ingredient = {
  ingredient: string;
  colorCode: number;
}[];

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();
  const [ingredients, setIngredients] = useState<Ingredient>([]);
  const [recipes, setRecipes] = useState<string[]>([]);

  function deleteIngredient(index: number) {
    const toBeDeleted = index;
    setIngredients((prevState) => {
      return [...prevState].filter((_, index) => index !== toBeDeleted);
    });
  }

  function addIngredient(Event: FormEvent) {
    Event.preventDefault();
    if (!input) alert("Please enter a valid ingredient");
    else {
      const normalizedArray = input //Normalizing our Inputs and removing duplicate values
        .split(",")
        .map((inputs) => {
          const NO_SPACES_AND_DOTS = inputs.trimStart().replace(/\./g, " ");
          const CAPITALIZE =
            NO_SPACES_AND_DOTS.charAt(0).toUpperCase() +
            NO_SPACES_AND_DOTS.slice(1);
          return CAPITALIZE;
        });

      const recipeInputs = Array.from(new Set(normalizedArray));
      recipeInputs.forEach((input) => {
        const newIngredient = input;
        if (!ingredients.find((unique) => unique.ingredient == newIngredient)) {
          setIngredients((prevState) => {
            return [
              ...prevState,
              {
                ingredient: newIngredient,
                colorCode: Math.floor(Math.random() * 8) + 1,
              },
            ];
          });
        }
      });
    }
    setInput("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addIngredient(event);
    }
  }

  async function getRecipes(event: FormEvent) {
    event.preventDefault();
    const PROMPTS_TO_API = ingredients.map((i) => i.ingredient);
    const res: string = await fetch
      .post("/recipes", PROMPTS_TO_API)
      .then((res) => res.data.data);

    const recipes = res.split("\n").filter((str) => str !== "." && str !== "");
    setRecipes(recipes);
    console.log(recipes);
  }

  return (
    <div>
      <header className="items-center justify-center flex flex-col">
        <Navbar />
        <h1 className="text-2xl font-bold mb-3">
          Please insert your ingredients in the box
        </h1>
        <em>
          Make sure to separate them by <strong>commas</strong> (,)
        </em>
        <em>Example: {'"Banana, Avocado, Milk, Sugar, Cereal" etc'}</em>
      </header>
      <form className="flex flex-col items-center justify-center gap-4">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
          className="w-1/3 border-2 border-black p-2 outline-none"
        />
        <button
          onClick={(e) => addIngredient(e)}
          className="border-2 rounded-2xl max-w-2xl p-2 bg-rose-700 text-violet-100 font-bold hover:bg-rose-500"
        >
          ADD INGREDIENT
        </button>
      </form>

      {ingredients.length ? (
        <div className="flex m-2 justify-center items-center">
          <p className="font-mono text-lg underline">
            You are requesting a recipe using the following ingredients:
          </p>
          <br />
        </div>
      ) : null}

      <div className="flex flex-row m-2 items-center justify-center">
        {ingredients.length
          ? ingredients.map((item, index) => (
              <RecipeTag
                key={index}
                ingredient={item.ingredient}
                customClass="mt-2"
                index={index}
                deleteIngredient={deleteIngredient}
                colorCode={item.colorCode}
              />
            ))
          : null}
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        {ingredients.length && !recipes.length ? (
          <button
            type="submit"
            onClick={(e) => getRecipes(e)}
            className="bg-green-700 hover:bg-green-600 text-white font-bold max-w-3xl p-2 rounded flex justify-center self-center"
          >
            Get Recipes
          </button>
        ) : null}
        <div className="max-w-3xl mt-6">
        {recipes.length ? recipes.map((recipe, index) => <p className="font-mono pb-4" key={index}>{recipe}</p>) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
