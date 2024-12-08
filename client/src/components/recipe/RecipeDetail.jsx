import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, ChefHat, Users, Heart } from 'lucide-react';
import { recipesByCategory, featuredRecipes } from '../../data/recipes';

const RecipeDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        // First check prefilled recipes
        const allPrefilledRecipes = [
          ...Object.values(recipesByCategory).flat(),
          ...featuredRecipes
        ];
        const prefilledRecipe = allPrefilledRecipes.find(r => r.id === id);
        
        if (prefilledRecipe) {
          setRecipe(prefilledRecipe);
        } else {
          // If not found in prefilled, fetch from database
          const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
          if (!response.ok) {
            throw new Error('Recipe not found');
          }
          const data = await response.json();
          setRecipe({
            ...data,
            time: `${data.prepTime + data.cookTime} min`,
            chef: data.author?.username || 'Anonymous'
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error || !recipe) {
    return <div className="text-center py-12">Recipe not found</div>;
  }

  const totalTime = recipe.time;

 return (
   <div className="max-w-4xl mx-auto px-4 py-8">
     <div className="relative">
       <img
         src={recipe.image}
         alt={recipe.title}
         className="w-full h-96 object-cover rounded-lg"
       />
       <button
         onClick={() => setIsFavorite(!isFavorite)}
         className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
       >
         <Heart
           className={`h-6 w-6 ${
             isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
           }`}
         />
       </button>
     </div>

     <div className="mt-6">
       <h1 className="text-4xl font-bold text-gray-900">{recipe.title}</h1>
       <div className="mt-4 flex items-center space-x-6 text-gray-500">
         <div className="flex items-center">
           <Clock className="h-5 w-5 mr-2" />
           <span>Time: {totalTime}</span>
         </div>
         <div className="flex items-center">
           <Users className="h-5 w-5 mr-2" />
           <span>Difficulty: {recipe.difficulty}</span>
         </div>
         <div className="flex items-center">
           <ChefHat className="h-5 w-5 mr-2" />
           <span>{recipe.chef}</span>
         </div>
       </div>
     </div>

     <p className="mt-6 text-gray-600">{recipe.description}</p>

     <div className="mt-8">
       <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
       <ul className="bg-gray-50 rounded-lg p-6 space-y-2">
         {recipe.ingredients.map((ingredient, index) => (
           <li key={index} className="flex items-center space-x-2">
             <span className="w-2 h-2 bg-green-500 rounded-full" />
             <span>{ingredient}</span>
           </li>
         ))}
       </ul>
     </div>

     <div className="mt-8">
       <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
       <ol className="space-y-4">
         {recipe.instructions.map((instruction, index) => (
           <li key={index} className="flex space-x-4">
             <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
               {index + 1}
             </span>
             <p className="text-gray-600 flex-1 pt-1">{instruction}</p>
           </li>
         ))}
       </ol>
     </div>
   </div>
 );
};

export default RecipeDetail;