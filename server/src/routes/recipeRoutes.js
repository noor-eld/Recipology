const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const recipeController = require('../controllers/recipeController');
const favoriteController = require('../controllers/favoriteController');

// Debug middleware for this router
router.use((req, res, next) => {
  console.log('Recipe Route:', req.method, req.originalUrl, req.path);
  next();
});

// Protected routes - most specific first
router.get('/user/myrecipes', protect, (req, res, next) => {
  console.log('Accessing /user/myrecipes route');
  next();
}, recipeController.getUserRecipes);

router.get('/user/favorites', protect, favoriteController.getFavorites);

// General routes
router.get('/search', recipeController.searchRecipes);
router.get('/:id', recipeController.getRecipeById);
router.get('/', recipeController.getAllRecipes);

// Other protected routes
router.post('/', protect, upload.single('image'), recipeController.createRecipe);
router.put('/:id', protect, upload.single('image'), recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);
router.post('/:recipeId/favorite', protect, favoriteController.toggleFavorite);

module.exports = router;