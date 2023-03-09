import { RecipeTag } from "@/components/recipe_tag";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";

type Ingredient = {
  ingredient: string;
  colorCode: number;
}[];

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();
  const [ingredients, setIngredients] = useState<Ingredient>([]);

  function deleteIngredient(index: number) {
    const toBeDeleted = index;
    const newArray = ingredients.filter((_, index) => index !== toBeDeleted);
    setIngredients(newArray);
  }

  function addIngredient(Event: FormEvent) {
    Event.preventDefault();
    if (!input) alert("Please enter a valid ingredient");
    else {
 
      const normalizedArray = input      //Normalizing our Inputs and removing duplicate values
        .split(",")
        .map((inputs) => inputs[0]?.toUpperCase() + inputs.substring(1).trim().toLowerCase());
      const recipeInputs = Array.from(new Set(normalizedArray));
     
      recipeInputs.forEach((input) => {  //Avoiding duplicates from what has been already entered
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
        };
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
      <header>
        <h1 className="text-zinc-500">Just a test</h1>
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
          Adicionar Ingrediente
        </button>
      </form>

      {ingredients.length
        ? ingredients.map((item, index) => (
            <RecipeTag
              key={index}
              ingredient={item.ingredient}
              id={index}
              deleteIngredient={deleteIngredient}
              colorCode={item.colorCode}
            />
          ))
        : null}
    </div>
  );
};

export default Home;
