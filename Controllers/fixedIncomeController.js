const FixedIncome = require('../models/FixedIncome');
const Category = require('../models/Category');

const addFixedIncome = async (req, res) => {
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

        // Create FixedIncome entry
        const fixedIncome = await FixedIncome.create({
            title,
            description,
            amount,
            currency,
            date,
            categoryId,
        });

        return res.status(201).json({ message: 'Fixed income added successfully.', data: fixedIncome });
    } catch (error) {
        console.error('Error adding fixed income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addFixedIncome };
