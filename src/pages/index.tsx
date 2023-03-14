import { RecipeTag } from "@/components/recipe_tag";
import type { NextPage } from "next";
import { FormEvent, ReactNode, useState } from "react";

type Ingredient = {
  ingredient: string;
  colorCode: number;
}[];

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();
  const [ingredients, setIngredients] = useState<Ingredient>([]);

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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addIngredient(event);
    }
  };

  return (
    <div>
      <header className="items-center justify-center flex flex-col">
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

      <div className="flex flex-col mt-5 justify-center items-center">
        <p className="font-mono text-lg underline">
          You are requesting a recipe using the following ingredients:
        </p>
        <br />
      </div>
      <div className="flex flex-row items-center justify-center">
      {ingredients.length
        ? ingredients.map((item, index) => (
            <>
              <RecipeTag
                ingredient={item.ingredient}
                customClass="mt-2"
                index={index}
                deleteIngredient={deleteIngredient}
                colorCode={item.colorCode}
              />
            </>
          ))
        : null}
        </div>
    </div>
  );
};

export default Home;