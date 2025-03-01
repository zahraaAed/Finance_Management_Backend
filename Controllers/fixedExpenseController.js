const FixedExpense = require('../Models/FixedExpense');
const Category = require('../models/Category');

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

module.exports = { addFixedExpense };
