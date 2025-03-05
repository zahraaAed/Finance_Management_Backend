const FixedExpense = require('../Models/FixedExpense.js');
const Category = require('../Models/categoryModel.js');

const addFixedExpense = async (req, res) => {
    try {
        const { title, description, amount, currency, startDate, endDate, categoryId } = req.body;

        // Validate required fields
        if (!title || !amount || !currency ||  !startDate || !endDate || !categoryId) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Ensure category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        // Ensure the date is not in the future
        if (new Date(startDate) > new Date()) {
            return res.status(400).json({ error: 'Start date cannot be in the future.' });
        }

        // Ensure endDate is after startDate
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ error: 'End date must be after start date.' });
        }

        // Create FixedExpense entry
        const fixedExpense = await FixedExpense.create({
            title,
            description,
            amount,
            currency,
            startDate, endDate,
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
        console.log('Fetching fixed expenses...');
        
        // Fetch the fixed expenses and include the associated category
        const fixedExpenses = await FixedExpense.findAll({ include: Category });

        // Log the fetched fixed expenses to verify the data
        console.log('Fixed Expenses:', fixedExpenses);

        // Send a successful response
        return res.status(200).json({ data: fixedExpenses });
    } catch (error) {
        // Log the error details for debugging
        console.error('Error fetching fixed expenses:', error);
        console.error('Error details:', error.message);
        console.error('Stack trace:', error.stack);
        
        // Send an internal server error response with the error message
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
