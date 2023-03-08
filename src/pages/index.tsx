import { RecipeTag } from "@/components/recipe_tag";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";

type Ingredient = {
  id: number,
  ingredient: string,
  colorCode: number
}[]

const Home: NextPage = () => {
  const [input, setInput] = useState<string>()
  const [ingredients, setIngredients] = useState<Ingredient>([])

  function deleteIngredient(index: number){
    const toBeDeleted = index;
    const newArray = ingredients.filter((_, index) => index !== toBeDeleted);
    setIngredients(newArray);
  }

  function addIngredient(Event: FormEvent){
    Event.preventDefault();
    if (!input) alert("Please enter a valid ingredient")
    else {
      const newIngredient = {
        id: ingredients.length,
        ingredient: input,
        colorCode: Math.floor(Math.random() * 8) + 1
      }
      setIngredients((prevState) => {
        return [...prevState, newIngredient]
      });
    }
    setInput('')
    console.log('I worked', ingredients);
  }

  return (
    <div>
      <header>
        <h1 className="text-zinc-500">Just a test</h1>
      </header>
      <form>
        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
        />
        <button onClick={(e) => addIngredient(e)} className="border-2 rounded-2xl p-2 bg-rose-700 text-violet-100 font-bold hover:bg-rose-500">
          Adicionar Ingrediente
        </button>
      </form>

      {ingredients.length ? ingredients.map((item, index) => (
        <RecipeTag key={index} ingredient={item.ingredient} colorCode={item.colorCode} id={item.id} deleteIngredient={deleteIngredient} />
      )): null}
    </div>
  );
};

export default Home;
