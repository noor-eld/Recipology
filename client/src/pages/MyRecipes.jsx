import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/recipe/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Loader } from 'lucide-react';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({ loading: false, error: null });
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUserRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }
  
      const url = 'http://localhost:5000/api/recipes/user/myrecipes';
      console.log('Fetching from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
  
      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recipes');
      }
  
      const data = await response.json();
      console.log('Recipes fetched:', data);
      setRecipes(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    setDeleteStatus({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete recipe');
      }

      // Remove the deleted recipe from the state
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      
      // Show success message (optional)
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
      successMessage.textContent = 'Recipe deleted successfully';
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);

    } catch (err) {
      console.error('Delete error:', err);
      setDeleteStatus({ loading: false, error: err.message });
      
      // Show error for 3 seconds
      setTimeout(() => {
        setDeleteStatus(prev => ({ ...prev, error: null }));
      }, 3000);
    } finally {
      setDeleteStatus(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchUserRecipes();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Error Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {deleteStatus.error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {deleteStatus.error}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
          <p className="mt-2 text-gray-600">Recipes you've created</p>
        </div>
        <button
          onClick={() => navigate('/create-recipe')}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <ChefHat className="w-5 h-5" />
          Create New Recipe
        </button>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No recipes yet</h3>
          <p className="mt-2 text-gray-600">
            Start creating your own recipes to see them here
          </p>
          <button
            onClick={() => navigate('/create-recipe')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Create Your First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe._id} 
              recipe={recipe} 
              showAuthor={false}
              showDeleteButton={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;