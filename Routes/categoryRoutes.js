const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory,updateCategoryName } = require('../Controllers/categoryController');

// Route to add a category
router.post('/addcategorie', addCategory);//done

// Route to get all categories
router.get('/categories', getAllCategories);//done

// Route to delete a category by ID
router.delete('/categories/:id', deleteCategory);//done

// route to update the name of the category
router.put("/categories/:id/name", updateCategoryName);

module.exports = router;
