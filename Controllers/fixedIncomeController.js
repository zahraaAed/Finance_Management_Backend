const FixedIncome = require('../Models/fixedincomeModel');
const Category = require('../Models/categoryModel');

// Add Fixed Income
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

// Get all Fixed Incomes
const getAllFixedIncomes = async (req, res) => {
    try {
        const fixedIncomes = await FixedIncome.findAll({ include: Category });
        return res.status(200).json({ data: fixedIncomes });
    } catch (error) {
        console.error('Error fetching fixed incomes:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

// Delete a Fixed Income by ID
const deleteFixedIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const fixedIncome = await FixedIncome.findByPk(id);
        if (!fixedIncome) {
            return res.status(404).json({ error: 'Fixed income not found.' });
        }

        await fixedIncome.destroy();
        return res.status(200).json({ message: 'Fixed income deleted successfully.' });
    } catch (error) {
        console.error('Error deleting fixed income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addFixedIncome, getAllFixedIncomes, deleteFixedIncome };
