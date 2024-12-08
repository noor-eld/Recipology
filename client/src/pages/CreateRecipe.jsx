import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Loader } from 'lucide-react';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy',
    category: '',
    ingredients: [''],
    instructions: [''],
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const errors = {};
    
    if (!recipe.title.trim()) errors.title = 'Title is required';
    if (!recipe.description.trim()) errors.description = 'Description is required';
    if (!recipe.category) errors.category = 'Category is required';
    if (!recipe.prepTime) errors.prepTime = 'Prep time is required';
    if (!recipe.cookTime) errors.cookTime = 'Cook time is required';
    if (!recipe.servings) errors.servings = 'Number of servings is required';
    
    const filledIngredients = recipe.ingredients.filter(i => i.trim());
    if (filledIngredients.length === 0) {
      errors.ingredients = 'At least one ingredient is required';
    }

    const filledInstructions = recipe.instructions.filter(i => i.trim());
    if (filledInstructions.length === 0) {
      errors.instructions = 'At least one instruction is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Image handling
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return;
      }
      setRecipe(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  }, []);

  // Array field handlers
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };
  
  const removeIngredient = (index) => {
    if (recipe.ingredients.length > 1) { 
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };

  // Instructions handlers
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const removeInstruction = (index) => {
    if (recipe.instructions.length > 1) {
      const newInstructions = recipe.instructions.filter((_, i) => i !== index);
      setRecipe({ ...recipe, instructions: newInstructions });
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      // Append basic fields
      Object.keys(recipe).forEach(key => {
        if (key === 'image') {
          if (recipe.image instanceof File) {
            formData.append('image', recipe.image);
          }
        } else if (Array.isArray(recipe[key])) {
          // Filter out empty strings and stringify arrays
          const filteredArray = recipe[key].filter(item => item.trim());
          formData.append(key, JSON.stringify(filteredArray));
        } else if (typeof recipe[key] === 'string') {
          formData.append(key, recipe[key].trim());
        } else {
          formData.append(key, recipe[key]);
        }
      });

      // Add numeric fields
      ['prepTime', 'cookTime', 'servings'].forEach(field => {
        formData.set(field, recipe[field].toString() || '0');
      });

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to create a recipe');

      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to create recipe');
      }
      
      console.log('Created recipe data:', data);
      setSuccess(true);
      setTimeout(() => {
        console.log('Attempting navigation to /my-recipes');
        navigate('/my-recipes');
        console.log('Navigation completed');
      }, 2000);
    } catch (err) {
      console.error('Error creating recipe:', err);
      setError(err.message);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
    
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Recipe created successfully! Redirecting...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="recipe-image" className="block text-sm font-medium text-gray-700">
              Recipe Image {validationErrors.image && (
                <span className="text-red-500 text-xs ml-2">{validationErrors.image}</span>
              )}
            </label>
            <div className="flex items-center justify-center w-full">
              {imagePreview ? (
                <div className="relative w-full h-64">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setRecipe({ ...recipe, image: null });
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label htmlFor="recipe-image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400" />
                  <span className="mt-2 text-gray-500">Click to upload image</span>
                  <input
                    id="recipe-image"
                    name="recipe-image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
    
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="recipe-title" className="block text-sm font-medium text-gray-700">
                Title {validationErrors.title && (
                  <span className="text-red-500 text-xs ml-2">{validationErrors.title}</span>
                )}
              </label>
              <input
                id="recipe-title"
                name="title"
                type="text"
                value={recipe.title}
                onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="recipe-category" className="block text-sm font-medium text-gray-700">
                Category {validationErrors.category && (
                  <span className="text-red-500 text-xs ml-2">{validationErrors.category}</span>
                )}
              </label>
              <select
                id="recipe-category"
                name="category"
                value={recipe.category}
                onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="desserts">Desserts</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="quick">Quick</option>
              </select>
            </div>
          </div>
    
          {/* Time and Servings */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="prep-time" className="block text-sm font-medium text-gray-700">
                Prep Time (minutes) {validationErrors.prepTime && (
                  <span className="text-red-500 text-xs ml-2">{validationErrors.prepTime}</span>
                )}
              </label>
              <input
                id="prep-time"
                name="prepTime"
                type="number"
                value={recipe.prepTime}
                onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="cook-time" className="block text-sm font-medium text-gray-700">
                Cook Time (minutes) {validationErrors.cookTime && (
                  <span className="text-red-500 text-xs ml-2">{validationErrors.cookTime}</span>
                )}
              </label>
              <input
                id="cook-time"
                name="cookTime"
                type="number"
                value={recipe.cookTime}
                onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.cookTime ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
                Servings {validationErrors.servings && (
                  <span className="text-red-500 text-xs ml-2">{validationErrors.servings}</span>
                )}
              </label>
              <input
                id="servings"
                name="servings"
                type="number"
                value={recipe.servings}
                onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                  validationErrors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
                min="1"
              />
            </div>
          </div>
    
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description {validationErrors.description && (
                <span className="text-red-500 text-xs ml-2">{validationErrors.description}</span>
              )}
            </label>
            <textarea
              id="description"
              name="description"
              value={recipe.description}
              onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
              rows={3}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                validationErrors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
    
          {/* Ingredients */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingredients {validationErrors.ingredients && (
                <span className="text-red-500 text-xs ml-2">{validationErrors.ingredients}</span>
              )}
            </label>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className={`flex-1 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                    validationErrors.ingredients ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 2 cups flour"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  -
                </button>
                {index === recipe.ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
    
          {/* Instructions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Instructions {validationErrors.instructions && (
                <span className="text-red-500 text-xs ml-2">{validationErrors.instructions}</span>
              )}
            </label>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className={`flex-1 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ${
                    validationErrors.instructions ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={2}
                  placeholder={`Step ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  -
                </button>
                {index === recipe.instructions.length - 1 && (
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
    
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 ${
                loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
              } text-white rounded-md transition-colors flex items-center gap-2`}
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default CreateRecipe;