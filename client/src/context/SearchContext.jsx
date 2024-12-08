import React, { createContext, useContext, useState } from 'react';
import { recipesByCategory, featuredRecipes } from '../data/recipes';

// Create the context
const SearchContext = createContext(null);

// Create the hook
const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Create the provider component
const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to search through prefilled recipes
  const searchPrefilledRecipes = (query) => {
    const queryLower = query.toLowerCase();
    const results = [];

    // Search in featured recipes
    results.push(...featuredRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(queryLower) ||
      recipe.description.toLowerCase().includes(queryLower) ||
      recipe.ingredients.some(ing => 
        typeof ing === 'string' 
          ? ing.toLowerCase().includes(queryLower)
          : ing.name?.toLowerCase().includes(queryLower)
      )
    ));

    // Search in all categories
    Object.values(recipesByCategory).forEach(categoryRecipes => {
      results.push(...categoryRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(queryLower) ||
        recipe.description.toLowerCase().includes(queryLower) ||
        recipe.ingredients.some(ing => 
          typeof ing === 'string' 
            ? ing.toLowerCase().includes(queryLower)
            : ing.name?.toLowerCase().includes(queryLower)
        )
      ));
    });

    return results;
  };

  const searchRecipes = async (query, category = '') => {
    if (!query?.trim()) {
      setSearchResults([]);
      setSearchTerm('');
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      setSearchTerm(query);

      // Search prefilled recipes
      const prefilledResults = searchPrefilledRecipes(query);

      // Search database recipes
      let dbRecipes = [];
      try {
        const response = await fetch(
          `http://localhost:5000/api/recipes/search?q=${query}${category ? `&category=${category}` : ''}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        dbRecipes = await response.json();
      } catch (err) {
        console.error('Database search error:', err);
      }

      // Combine and deduplicate results
      const allResults = [...prefilledResults, ...dbRecipes].reduce((acc, current) => {
        const x = acc.find(item => (item.id || item._id) === (current.id || current._id));
        if (!x) {
          return acc.concat([current]);
        }
        return acc;
      }, []);

      setSearchResults(allResults);
      return allResults;
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search recipes');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setError(null);
  };

  const value = {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading,
    error,
    searchRecipes,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// Export both the provider and hook
export { SearchProvider, useSearch };