const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { recipesByCategory, featuredRecipes } = require('../data/recipes');

// Helper function to find a recipe in prefilled data
const findPrefilledRecipe = (recipeId) => {
  // Check featured recipes first
  const featuredRecipe = featuredRecipes.find(r => r.id === recipeId);
  if (featuredRecipe) return featuredRecipe;

  // Check all categories
  for (const category in recipesByCategory) {
    const recipe = recipesByCategory[category].find(r => r.id === recipeId);
    if (recipe) return recipe;
  }
  return null;
};

exports.getFavorites = async (req, res) => {
  try {
    console.log('Getting favorites for user:', req.user._id);
    
    // Get user with populated database favorites
    const user = await User.findById(req.user._id)
      .populate({
        path: 'favorites',
        populate: {
          path: 'author',
          select: 'username'
        }
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get database favorites
    const dbFavorites = user.favorites || [];

    // Get prefilled favorites
    const prefilledFavorites = (user.demoFavorites || [])
      .map(id => findPrefilledRecipe(id))
      .filter(recipe => recipe !== null); // Remove any not found recipes

    // Combine both types of favorites
    const allFavorites = [
      ...dbFavorites,
      ...prefilledFavorites
    ];

    console.log('Total favorites found:', allFavorites.length);
    res.json(allFavorites);
  } catch (error) {
    console.error('Error in getFavorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    // Check if it's a prefilled recipe (starts with b, l, d, ds, v, q, or f)
    const isPrefilled = /^[bldfvq]\d+$/.test(recipeId);

    if (isPrefilled) {
      // Handle prefilled recipe favorite
      const user = await User.findById(userId);
      if (!user.demoFavorites) {
        user.demoFavorites = [];
      }

      const isAlreadyFavorited = user.demoFavorites.includes(recipeId);

      if (isAlreadyFavorited) {
        user.demoFavorites = user.demoFavorites.filter(id => id !== recipeId);
      } else {
        user.demoFavorites.push(recipeId);
      }

      await user.save();
      
      return res.json({
        message: isAlreadyFavorited ? 'Removed from favorites' : 'Added to favorites',
        isFavorited: !isAlreadyFavorited
      });
    }

    // Handle database recipe favorite
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const isAlreadyFavorited = user.favorites.includes(recipeId);

    if (isAlreadyFavorited) {
      user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
      recipe.favoriteCount = Math.max(0, recipe.favoriteCount - 1);
    } else {
      user.favorites.push(recipeId);
      recipe.favoriteCount += 1;
    }

    await user.save();
    await recipe.save();

    res.json({
      message: isAlreadyFavorited ? 'Removed from favorites' : 'Added to favorites',
      isFavorited: !isAlreadyFavorited
    });
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    res.status(500).json({ message: 'Error toggling favorite status' });
  }
};