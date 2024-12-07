const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const recipeController = require('../controllers/recipeController');
const favoriteController = require('../controllers/favoriteController');

// Public routes
router.get('/', recipeController.getAllRecipes);
router.get('/search', recipeController.searchRecipes);
router.get('/user/favorites', protect, favoriteController.getFavorites); // Note position - before /:id
router.get('/:id', recipeController.getRecipeById);

// Protected routes
router.post('/', protect, upload.single('image'), recipeController.createRecipe);
router.put('/:id', protect, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);

// Favorite routes
router.post('/:recipeId/favorite', protect, favoriteController.toggleFavorite);

module.exports = router;