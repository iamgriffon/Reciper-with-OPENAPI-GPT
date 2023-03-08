import clsx from 'clsx';

interface RecipeTagProps {
  colorCode: number;
  ingredient: string;
  id: number,
  deleteIngredient: (param: number) => void;
}

const spanStyles = 'inline-flex items-center px-2 py-1 mr-2 text-sm font-medium';
const buttonStyles = 'inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm';

export function RecipeTag({ colorCode, ingredient, id, deleteIngredient }: RecipeTagProps) {
  return (
    <span
      id={clsx({
        'badge-dismiss-default': colorCode == 1,
        'badge-dismiss-dark': colorCode == 2,
        'badge-dismiss-red': colorCode == 3,
        'badge-dismiss-green': colorCode == 4,
        'badge-dismiss-yellow': colorCode == 5,
        'badge-dismiss-indigo': colorCode == 6,
        'badge-dismiss-purple': colorCode == 7,
        'badge-dismiss-pink': colorCode == 8
      })}
      className={spanStyles + clsx({
        'text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300' : colorCode == 1,
        'text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300': colorCode == 2,
        'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300': colorCode == 3,
        'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300': colorCode == 4,
        'text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300': colorCode == 5,
        'text-indigo-800 bg-indigo-100 rounded dark:bg-indigo-900 dark:text-indigo-300': colorCode == 6,
        'text-purple-800 bg-purple-100 rounded dark:bg-purple-900 dark:text-purple-300': colorCode == 7,
        'text-pink-800 bg-pink-100 rounded dark:bg-pink-900 dark:text-pink-300': colorCode == 8,
      })}
    >
      {ingredient}
      <button
        type="button"
        className={buttonStyles + clsx({
          'text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300': colorCode == 1,
          'text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300': colorCode == 2,
          'text-red-400 hover:bg-red-200 hover:text-red-900 dark:hover:bg-red-800 dark:hover:text-red-300': colorCode == 3,
          'text-green-400 hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300': colorCode == 4,
          'text-yellow-400 hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-800 dark:hover:text-yellow-300': colorCode == 5,
          'text-indigo-400 hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-300': colorCode == 6,
          'text-purple-400 hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300': colorCode == 7,
          'text-pink-400 hover:bg-pink-200 hover:text-pink-900 dark:hover:bg-pink-800 dark:hover:text-pink-300': colorCode == 8,
        })}
        data-dismiss-target={clsx({
          "#badge-dismiss-default": colorCode == 1,      
          '#badge-dismiss-dark': colorCode == 2,
          '#badge-dismiss-red': colorCode == 3,
          '#badge-dismiss-green': colorCode == 4,
          '#badge-dismiss-yellow': colorCode == 5,
          '#badge-dismiss-indigo': colorCode == 6,
          '#badge-dismiss-purple': colorCode == 7,
          '#badge-dismiss-pink': colorCode == 8
        })}
        aria-label="Remove"
        onClick={() => deleteIngredient(id)}
      >
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Remove</span>
      </button>
    </span>
  );
}
