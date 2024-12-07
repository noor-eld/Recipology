const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  try {
    // Log authentication info
    console.log('Auth user:', req.user ? { id: req.user._id, username: req.user.username } : 'No user');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Parse JSON strings
    const ingredients = JSON.parse(req.body.ingredients || '[]');
    const instructions = JSON.parse(req.body.instructions || '[]');

    // Create recipe object
    const recipeData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      prepTime: Number(req.body.prepTime),
      cookTime: Number(req.body.cookTime),
      servings: Number(req.body.servings),
      difficulty: req.body.difficulty || 'Easy',
      ingredients: ingredients,
      instructions: instructions,
      author: req.user._id // Set the authenticated user as author
    };

    if (req.file) {
      recipeData.image = `/uploads/${req.file.filename}`;
    }

    console.log('Attempting to create recipe with data:', recipeData);

    // Create new recipe
    const recipe = new Recipe(recipeData);
    
    // Validate the recipe
    const validationError = recipe.validateSync();
    if (validationError) {
      console.log('Validation error:', validationError);
      return res.status(400).json({ 
        error: 'Validation error',
        details: Object.values(validationError.errors).map(err => err.message)
      });
    }

    // Save the recipe
    const savedRecipe = await recipe.save();
    console.log('Recipe saved successfully:', savedRecipe._id);

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error in createRecipe:', error);
    
    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create recipe',
      details: error.message 
    });
  }
};

// Get All Recipes
exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find()
        .populate('author', 'username')
        .sort('-createdAt');
      res.json(recipes);
    } catch (error) {
      console.error('Error in getAllRecipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
    }
  };
  
  // Get Recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id)
        .populate('author', 'username');
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      
      res.json(recipe);
    } catch (error) {
      console.error('Error in getRecipeById:', error);
      res.status(500).json({ error: 'Failed to fetch recipe' });
    }
  };
  
  // Update Recipe
exports.updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      // Check if user is the author
      if (recipe.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to update this recipe' });
      }
  
      // Parse JSON strings if they exist in the request
      const ingredients = req.body.ingredients ? JSON.parse(req.body.ingredients) : recipe.ingredients;
      const instructions = req.body.instructions ? JSON.parse(req.body.instructions) : recipe.instructions;
  
      // Update recipe data
      const updateData = {
        title: req.body.title || recipe.title,
        description: req.body.description || recipe.description,
        category: req.body.category || recipe.category,
        prepTime: req.body.prepTime || recipe.prepTime,
        cookTime: req.body.cookTime || recipe.cookTime,
        servings: req.body.servings || recipe.servings,
        difficulty: req.body.difficulty || recipe.difficulty,
        ingredients: ingredients,
        instructions: instructions
      };
  
      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate('author', 'username');
  
      res.json(updatedRecipe);
    } catch (error) {
      console.error('Error in updateRecipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    }
  };
  
  // Delete Recipe
exports.deleteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      // Check if user is the author
      if (recipe.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to delete this recipe' });
      }
  
      await recipe.remove();
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error in deleteRecipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  };
  
  // Search Recipes
exports.searchRecipes = async (req, res) => {
    try {
      const { q, category } = req.query;
      const query = {};
  
      if (q) {
        query.$text = { $search: q };
      }
  
      if (category) {
        query.category = category.toLowerCase();
      }
  
      const recipes = await Recipe.find(query)
        .populate('author', 'username')
        .sort('-createdAt');
  
      res.json(recipes);
    } catch (error) {
      console.error('Error in searchRecipes:', error);
      res.status(500).json({ error: 'Failed to search recipes' });
    }
  };