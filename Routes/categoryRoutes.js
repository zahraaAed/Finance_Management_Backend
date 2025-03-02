const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory } = require('../Controllers/categoryController');

// Route to add a category
router.post('/addcategorie', addCategory);

// Route to get all categories
router.get('/categories', getAllCategories);

// Route to delete a category by ID
router.delete('/categories/:id', deleteCategory);

module.exports = router;
