const RecurringExpense = require('../Models/RecurringExpense');
const Category = require('../Models/categoryModel');

const addRecurringExpense = async (req, res) => {
    try {
        const { title, description, amount, currency, startDate, endDate, categoryId } = req.body;

        // Validate required fields
        if (!title || !amount || !currency || !startDate || !endDate || !categoryId) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        // Ensure category exists
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        // Ensure the startDate is not in the future
        if (new Date(startDate) > new Date()) {
            return res.status(400).json({ error: 'Start date cannot be in the future.' });
        }

        // Ensure endDate is after startDate
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ error: 'End date must be after start date.' });
        }

        // Create RecurringExpense entry
        const recurringExpense = await RecurringExpense.create({
            title,
            description,
            amount,
            currency,
            startDate,
            endDate,
            categoryId,
        });

        return res.status(201).json({ message: 'Recurring expense added successfully.', data: recurringExpense });
    } catch (error) {
        console.error('Error adding recurring expense:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Get all recurring expenses
const getAllRecurringExpenses = async (req, res) => {
    try {
        const recurringExpenses = await RecurringExpense.findAll({ include: Category });
        return res.status(200).json({ data: recurringExpenses });
    } catch (error) {
        console.error('Error fetching recurring expenses:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete a recurring expense by ID
const deleteRecurringExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const recurringExpense = await RecurringExpense.findByPk(id);
        if (!recurringExpense) {
            return res.status(404).json({ error: 'Recurring expense not found.' });
        }

        await recurringExpense.destroy();
        return res.status(200).json({ message: 'Recurring expense deleted successfully.' });
    } catch (error) {
        console.error('Error deleting recurring expense:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addRecurringExpense, getAllRecurringExpenses, deleteRecurringExpense };
