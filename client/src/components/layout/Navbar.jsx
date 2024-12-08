import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Heart } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Recipology
          </Link>

          <div className="flex space-x-4 items-center">
            {user ? (
              <>
                <Link 
                  to="/create-recipe" 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Create Recipe
                </Link>
                <Link
                  to="/my-recipes"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  My Recipes
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <Heart className="h-5 w-5 mr-1" />
                  Favorites
                </Link>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-800">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;