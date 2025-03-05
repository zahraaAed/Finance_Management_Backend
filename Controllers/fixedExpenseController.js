const FixedExpense = require('../Models/FixedExpense.js');
const Category = require('../Models/categoryModel.js');

const addFixedExpense = async (req, res) => {
    try {
        const { title, description, amount, currency, date, categoryId } = req.body;

        // Validate required fields
        if (!title || !amount || !currency || !date || !categoryId) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Ensure category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        // Ensure the date is not in the future
        if (new Date(date) > new Date()) {
            return res.status(400).json({ error: 'Date cannot be in the future.' });
        }

        // Create FixedExpense entry
        const fixedExpense = await FixedExpense.create({
            title,
            description,
            amount,
            currency,
            date,
            categoryId,
        });

        return res.status(201).json({ message: 'Fixed expense added successfully.', data: fixedExpense });
    } catch (error) {
        console.error('Error adding fixed expense:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all fixed expenses
const getAllFixedExpenses = async (req, res) => {
    try {
        const fixedExpenses = await FixedExpense.findAll({ include: Category });
        return res.status(200).json({ data: fixedExpenses });
    } catch (error) {
        console.error('Error fetching fixed expenses:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete a fixed expense by ID
const deleteFixedExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const fixedExpense = await FixedExpense.findByPk(id);
        if (!fixedExpense) {
            return res.status(404).json({ error: 'Fixed expense not found.' });
        }

        await fixedExpense.destroy();
        return res.status(200).json({ message: 'Fixed expense deleted successfully.' });
    } catch (error) {
        console.error('Error deleting fixed expense:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addFixedExpense, getAllFixedExpenses, deleteFixedExpense };
