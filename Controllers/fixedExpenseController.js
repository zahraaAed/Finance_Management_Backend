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
        console.log('Attempting to fetch Fixed expenses with Category inclusion...');

        const fixedexpense = await FixedExpense.findAll({ 
            attributes: [
                'id', 'title', 'description', 'amount', 'currency', 
                'startDate', 'endDate', 'createdAt', 'updatedAt', 
                'categoryId', 'profitgoalId', 'userId', 'superadminId'
            ],
            include: {
                model: Category,
                attributes: ['id', 'name'] // Include only necessary fields from Category
            },
            where: { isDeleted: false }, // Exclude soft deleted records
            order: [['createdAt', 'DESC']] // Sort by newest first
        });

        console.log('Fetched Fixed Incomes:', fixedexpense);

        return res.status(200).json({ data: fixedexpense });
    } catch (error) {
        console.error('Error fetching fixed incomes:', error.message);
        console.error('Error stack:', error.stack);

        return res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
};

// Delete a fixed expense by ID
const deleteFixedExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const fixedExpenses = await FixedExpense.findByPk(id);
        if (!fixedExpenses) {
            return res.status(404).json({ error: 'Fixed expense not found.' });
        }

        // Perform soft delete by updating is_deleted column
        await fixedExpenses.update({ isDeleted: true });

        return res.status(200).json({ message: 'Fixed expense marked as deleted successfully.' });
    } catch (error) {
        console.error('Error deleting fixed expense:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { addFixedExpense, getAllFixedExpenses, deleteFixedExpense };
