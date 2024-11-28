import React from 'react';
import { Clock, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
    >
      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-t-xl" 
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {recipe.time}
          </span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="mt-4 pt-4 border-t text-sm text-gray-600">
          <span className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {recipe.chef}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;