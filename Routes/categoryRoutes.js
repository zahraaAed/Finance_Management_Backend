const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory } = require('../Controllers/categoryController');

// Route to add a category
router.post('/addcategorie', addCategory);//done

// Route to get all categories
router.get('/categories', getAllCategories);//done

// Route to delete a category by ID
router.delete('/categories/:id', deleteCategory);//done

module.exports = router;
