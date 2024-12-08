import React, { useState } from 'react';
import { Clock, ChefHat, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/recipe/RecipeCard';
import SearchBar from '../components/layout/SearchBar';
import { useSearch } from '../context/SearchContext';
import { recipesByCategory, featuredRecipes } from '../data/recipes';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { searchTerm, searchResults, loading, error } = useSearch();
  const { user } = useAuth();

  // Get current recipes to display based on category or search
  const getCurrentRecipes = () => {
    if (searchTerm && searchResults.length > 0) {
      return searchResults;
    }
    
    if (selectedCategory) {
      return recipesByCategory[selectedCategory.toLowerCase()] || [];
    }
    
    return [];
  };

  const categories = [
    { name: 'Breakfast', icon: '🍳' },
    { name: 'Lunch', icon: '🥪' },
    { name: 'Dinner', icon: '🍽️' },
    { name: 'Desserts', icon: '🍰' },
    { name: 'Vegetarian', icon: '🥗' },
    { name: 'Quick', icon: '⚡' }
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Recipology</h1>
            <p className="text-xl mb-8">Discover, Create, and Share Your Culinary Masterpieces</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar isHero={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Recipes</h3>
            <p className="text-gray-600">Curated recipes from professional chefs worldwide</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-gray-600">Find recipes that fit your busy schedule</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">Share and discover community favorites</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`p-6 text-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all ${
                selectedCategory === category.name.toLowerCase() ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Category/Search Results Section */}
      {(selectedCategory || searchResults.length > 0) && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 capitalize">
              {searchTerm ? 'Search Results' : `${selectedCategory} Recipes`}
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            ) : getCurrentRecipes().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getCurrentRecipes().map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 p-8 bg-gray-50 rounded-lg">
                {searchTerm ? 'No recipes found matching your search.' : 'No recipes found in this category.'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Recipes Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Recipes</h2>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span>Trending now</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      {!user ? (
        <div className="bg-green-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
            <p className="text-xl text-gray-600 mb-8">Join our community and share your culinary creations</p>
            <Link 
              to="/register" 
              className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back, {user.username}!</h2>
            <p className="text-xl text-gray-600 mb-8">Ready to create your next culinary masterpiece?</p>
            <Link 
              to="/create-recipe" 
              className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
            >
              Create New Recipe
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;