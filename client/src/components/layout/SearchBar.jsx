// SearchBar.jsx
import React, { useState } from 'react';
import { Search, X, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

const SearchBar = ({ isHero = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchTerm, setSearchTerm, searchRecipes, clearSearch, loading } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    await searchRecipes(searchTerm);
    if (!isHero) {
      navigate('/search');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    searchRecipes(value);
  };

  const handleClear = () => {
    clearSearch();
    setIsExpanded(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center ${
        isHero ? 'w-full' : isExpanded ? 'w-64 md:w-96' : 'w-10'
      } transition-all duration-300`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute left-0 p-2 text-gray-600 hover:text-gray-800 ${
          isHero || isExpanded ? 'hidden' : 'block'
        }`}
      >
        <Search className="h-5 w-5" />
      </button>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search recipes..."
        className={`w-full py-2 px-8 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 ${
          isHero || isExpanded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      />

      {loading && (
        <div className="absolute right-2 p-2">
          <Loader className="h-4 w-4 animate-spin text-gray-600" />
        </div>
      )}

      {!loading && searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 p-2 text-gray-600 hover:text-gray-800"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;