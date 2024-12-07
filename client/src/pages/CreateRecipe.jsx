import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Clock, ChefHat, Users } from 'lucide-react';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      setRecipe({ ...recipe, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Convert empty strings to zero for numeric fields
      const numericFields = ['prepTime', 'cookTime', 'servings'];
      const processedRecipe = { ...recipe };
      numericFields.forEach(field => {
        if (processedRecipe[field] === '') {
          processedRecipe[field] = '0';
        }
      });
  
      // Create FormData
      const formData = new FormData();
  
      // Append basic fields
      formData.append('title', processedRecipe.title.trim());
      formData.append('description', processedRecipe.description.trim());
      formData.append('category', processedRecipe.category.toLowerCase());
      formData.append('prepTime', processedRecipe.prepTime.toString());
      formData.append('cookTime', processedRecipe.cookTime.toString());
      formData.append('servings', processedRecipe.servings.toString());
      formData.append('difficulty', processedRecipe.difficulty);
  
      // Clean and append arrays
      const cleanIngredients = processedRecipe.ingredients.filter(item => item.trim() !== '');
      const cleanInstructions = processedRecipe.instructions.filter(item => item.trim() !== '');
      
      if (cleanIngredients.length === 0) throw new Error('At least one ingredient is required');
      if (cleanInstructions.length === 0) throw new Error('At least one instruction is required');
  
      formData.append('ingredients', JSON.stringify(cleanIngredients));
      formData.append('instructions', JSON.stringify(cleanInstructions));
  
      // Handle image
      if (processedRecipe.image instanceof File) {
        formData.append('image', processedRecipe.image);
      }
  
      // Verify authentication
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please login to create a recipe');
  
      // Log form data for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
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
  
      console.log('Recipe created successfully:', data);
      navigate('/');
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
        <label htmlFor="recipe-image" className="block text-sm font-medium text-gray-700">
          Recipe Image
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
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ) : (
            <label htmlFor="recipe-image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
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
            Title
          </label>
          <input
            id="recipe-title"
            name="title"
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="recipe-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="recipe-category"
            name="category"
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          >
            <option value="">Select category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
          </select>
        </div>
      </div>

        {/* Time and Servings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label htmlFor="prep-time" className="block text-sm font-medium text-gray-700">
            Prep Time (minutes)
          </label>
          <input
            id="prep-time"
            name="prepTime"
            type="number"
            value={recipe.prepTime}
            onChange={(e) => setRecipe({ ...recipe, prepTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="cook-time" className="block text-sm font-medium text-gray-700">
            Cook Time (minutes)
          </label>
          <input
            id="cook-time"
            name="cookTime"
            type="number"
            value={recipe.cookTime}
            onChange={(e) => setRecipe({ ...recipe, cookTime: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
            Servings
          </label>
          <input
            id="servings"
            name="servings"
            type="number"
            value={recipe.servings}
            onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            min="1"
            required
          />
        </div>
      </div>

        {/* Description */}
        <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

        {/* Ingredients */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="e.g., 2 cups flour"
                required
              />
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                -
              </button>
              {index === recipe.ingredients.length - 1 && (
                <button
                  type="button"
                  onClick={addIngredient}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                rows={2}
                placeholder={`Step ${index + 1}`}
                required
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                -
              </button>
              {index === recipe.instructions.length - 1 && (
                <button
                  type="button"
                  onClick={addInstruction}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
            } text-white rounded-md transition-colors`}
          >
            {loading ? 'Creating...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;