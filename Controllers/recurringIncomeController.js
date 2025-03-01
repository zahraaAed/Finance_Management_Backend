const RecurringIncome = require('../Models/RecurringIncome');
const Category = require('../Models/categoryModel');

const addRecurringIncome = async (req, res) => {
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

        // Create RecurringIncome entry
        const recurringIncome = await RecurringIncome.create({
            title,
            description,
            amount,
            currency,
            startDate,
            endDate,
            categoryId,
        });

        return res.status(201).json({ message: 'Recurring income added successfully.', data: recurringIncome });
    } catch (error) {
        console.error('Error adding recurring income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getAllRecurringIncomes = async (req, res) => {
    try {
        const recurringIncomes = await RecurringIncome.findAll({ include: Category });
        return res.status(200).json({ data: recurringIncomes });
    } catch (error) {
        console.error('Error fetching recurring incomes:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const deleteRecurringIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const recurringIncome = await RecurringIncome.findByPk(id);
        if (!recurringIncome) {
            return res.status(404).json({ error: 'Recurring income not found.' });
        }

        await recurringIncome.destroy();
        return res.status(200).json({ message: 'Recurring income deleted successfully.' });
    } catch (error) {
        console.error('Error deleting recurring income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addRecurringIncome, getAllRecurringIncomes, deleteRecurringIncome };
