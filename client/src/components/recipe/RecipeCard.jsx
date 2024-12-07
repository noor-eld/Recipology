import React, { useEffect } from 'react';
import { Clock, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../../context/AuthContext'; // Add this import

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log('Recipe data:', recipe);
    console.log('Recipe ID:', recipe._id || recipe.id);
  }, [recipe]);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      e.stopPropagation();
      return;
    }
    const recipeId = recipe._id || recipe.id;
    navigate(`/recipe/${recipeId}`);
  };

  const getTotalTime = () => {
    if (recipe.time) return recipe.time;
    if (recipe.prepTime && recipe.cookTime) {
      return `${recipe.prepTime + recipe.cookTime} min`;
    }
    return 'Time not specified';
  };

  const getAuthor = () => {
    if (recipe.chef) return recipe.chef;
    if (recipe.author?.username) return recipe.author.username;
    return 'Anonymous';
  };

  // Only show favorite button if user is logged in
  const showFavoriteButton = user && (recipe._id || recipe.id);

  return (
    <div 
      onClick={handleCardClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all relative"
    >
      {showFavoriteButton && (
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton 
            recipeId={recipe._id || recipe.id} 
            initialFavorited={recipe.isFavorited}
          />
        </div>
      )}

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
            {getTotalTime()}
          </span>
          <span>{recipe.difficulty}</span>
        </div>
        <div className="mt-4 pt-4 border-t text-sm text-gray-600">
          <span className="flex items-center">
            <ChefHat className="h-4 w-4 mr-1" />
            {getAuthor()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;