import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Heart } from 'lucide-react';

const FavoriteButton = ({ recipeId }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const isDemoRecipe = recipeId?.startsWith('b') || recipeId?.startsWith('l') || 
                      recipeId?.startsWith('d') || recipeId?.startsWith('v') || 
                      recipeId?.startsWith('q') || recipeId?.startsWith('f');

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user || !recipeId) return;
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/recipes/user/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const favorites = await response.json();
          setIsFavorited(favorites.some(fav => 
            (fav._id === recipeId) || (fav.id === recipeId)
          ));
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [recipeId, user]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!user) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/recipes/${recipeId}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.isFavorited);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={isLoading}
      className="p-2 rounded-full transition-colors duration-200 bg-white bg-opacity-75 hover:bg-opacity-100"
    >
      <Heart
        className={`h-6 w-6 ${
          isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'
        }`}
      />
    </button>
  );
};

export default FavoriteButton;