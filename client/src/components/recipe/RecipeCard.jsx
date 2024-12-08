import React, { useEffect } from 'react';
import { Clock, ChefHat, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../../context/AuthContext';

const RecipeCard = ({ recipe, onDelete, showDeleteButton = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      onDelete(recipe._id);
    }
  };

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
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {showDeleteButton && (
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Delete Recipe"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
        {showFavoriteButton && (
          <FavoriteButton 
            recipeId={recipe._id || recipe.id} 
            initialFavorited={recipe.isFavorited}
          />
        )}
      </div>

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