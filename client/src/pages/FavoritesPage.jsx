import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/recipe/RecipeCard';
import { Loader2 } from 'lucide-react';

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/recipes/user/favorites', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch favourites');
        }

        const data = await response.json();
        
        // Ensure all recipes have an id field (either _id or id)
        const processedData = data.map(recipe => ({
          ...recipe,
          id: recipe._id || recipe.id,
          isFavorited: true
        }));
        
        setFavourites(processedData);
      } catch (err) {
        console.error('Error fetching favourites:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Favourite Recipes</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-lg text-yellow-800">Please log in to view your favourites</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favourite Recipes</h1>
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favourite Recipes</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-lg text-red-800">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Favourite Recipes</h1>
      {favourites.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <p className="text-xl text-gray-600 mb-2">You haven't favourited any recipes yet.</p>
          <p className="text-gray-500">Browse recipes and click the heart icon to add them to your favourites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map(recipe => (
            <RecipeCard 
              key={recipe._id || recipe.id} 
              recipe={recipe} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;