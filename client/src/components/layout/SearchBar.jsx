import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { searchQuery, setSearchQuery, searchRecipes, clearSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    await searchRecipes(searchQuery);
    navigate('/search');
  };

  const handleClear = () => {
    clearSearch();
    setIsExpanded(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center ${isExpanded ? 'w-64 md:w-96' : 'w-10'} transition-all duration-300`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute left-0 p-2 text-gray-600 hover:text-gray-800 ${isExpanded ? 'hidden' : 'block'}`}
      >
        <Search className="h-5 w-5" />
      </button>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search recipes..."
        className={`w-full py-2 pl-8 pr-8 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      />

      {isExpanded && searchQuery && (
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