import React from 'react';
import { useSearch } from '../../context/SearchContext';
import RecipeCard from '../../components/recipe/RecipeCard';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const { searchQuery, searchResults, loading, error } = useSearch();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <p className="text-gray-600">Please try your search again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-600">
            {searchResults.length === 0 
              ? `No recipes found for "${searchQuery}"`
              : `Found ${searchResults.length} recipe${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`
            }
          </p>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Try adjusting your search terms or browse our categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchResults.map(recipe => (
              <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;