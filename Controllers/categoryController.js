const Category = require('../Models/categoryModel');

// Add a new category
const addCategory = async (req, res) => {
    try {
        const { name, userId, superadminId } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        // Ensure at least one of userId or superadminId is provided
        if (!userId && !superadminId) {
            return res.status(400).json({ message: 'Either userId or superadminId is required' });
        }

        // Create the category
        const category = await Category.create({ name, userId, superadminId });

        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error adding category', error: error.message });
    }
};


// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};


// Update only the category name
const updateCategoryName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Check if the category exists
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Update the name
        category.name = name;
        await category.save();

        res.status(200).json({
            message: "Category name updated successfully",
            category,
        });
    } catch (error) {
        console.error("Error updating category name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addCategory, getAllCategories, deleteCategory ,updateCategoryName};
