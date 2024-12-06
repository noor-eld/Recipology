const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const recipeController = require('../controllers/recipeController');

router.post('/', protect, recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', protect, recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);

module.exports = router;