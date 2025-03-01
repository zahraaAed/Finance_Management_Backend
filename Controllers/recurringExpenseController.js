const RecurringExpense = require('../Models/RecurringExpense');
const Category = require('../models/Category');

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

module.exports = { addRecurringExpense };
