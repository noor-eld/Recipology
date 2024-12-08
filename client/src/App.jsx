import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import MyRecipes from './pages/MyRecipes';


// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const CreateRecipe = React.lazy(() => import('./pages/CreateRecipe'));
const RecipeDetail = React.lazy(() => import('./components/recipe/RecipeDetail'));
const FavoritesPage = React.lazy(() => import('./pages/FavoritesPage'));
const SearchResults = React.lazy(() => import('./pages/search/SearchResults'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SearchProvider>
          <BrowserRouter>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
                
                {/* Protected Routes */}
                <Route 
                  path="/create-recipe" 
                  element={
                    <ProtectedRoute>
                      <CreateRecipe />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Catch all route for 404 */}
                <Route path="*" element={
                  <Navigate to="/" replace />
                } />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;