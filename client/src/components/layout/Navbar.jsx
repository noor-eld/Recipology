import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Recipology
          </Link>
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;