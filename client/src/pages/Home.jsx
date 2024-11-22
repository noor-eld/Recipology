import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Welcome to Recipology</h1>
      <p className="text-xl text-gray-600 mb-8">Find and share your favorite recipes!</p>
      
      {/* Search Section */}
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Sample Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {['Breakfast', 'Lunch', 'Dinner', 'Desserts'].map((category) => (
          <button
            key={category}
            className="p-4 text-center bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;