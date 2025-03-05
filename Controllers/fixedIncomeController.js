const FixedIncome = require('../Models/fixedincomeModel');
const Category = require('../Models/categoryModel');

// Add Fixed Income
const addFixedIncome = async (req, res) => {
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

        // Ensure the date is not in the future
        if (new Date(startDate) > new Date()) {
            return res.status(400).json({ error: 'Start date cannot be in the future.' });
        }

        // Ensure endDate is after startDate
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({ error: 'End date must be after start date.' });
        }
       

        // Create FixedIncome entry
        const fixedIncome = await FixedIncome.create({
            title,
            description,
            amount,
            currency,
            startDate, endDate,
            categoryId,
        });

        return res.status(201).json({ message: 'Fixed income added successfully.', data: fixedIncome });
    } catch (error) {
        console.error('Error adding fixed income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getAllFixedIncomes = async (req, res) => {
    try {
        // Check if FixedIncome model is defined and Category is properly included
        console.log('Attempting to fetch Fixed Incomes with Category inclusion...');
        
        // Ensure models are properly defined and the association is set correctly
        const fixedIncomes = await FixedIncome.findAll({ 
            include: Category 
        });
        
        // Log data before sending response
        console.log('Fetched Fixed Incomes:', fixedIncomes);

        // Return the response with the fetched data
        return res.status(200).json({ data: fixedIncomes });
    } catch (error) {
        // Log more detailed error message
        console.error('Error fetching fixed incomes:', error.message);
        console.error('Error stack:', error.stack);

        // Send detailed error message to the client
        return res.status(500).json({ error: 'Internal server error.', details: error.message });
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
