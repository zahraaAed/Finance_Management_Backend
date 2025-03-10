const FixedIncome = require('../Models/fixedincomeModel');
const Category = require('../Models/categoryModel');


// Add Fixed Income
const addFixedIncome = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { title, description, amount, currency, startDate, endDate, categoryId, profitgoalId, createdAt } = req.body;

        // Validate required fields
        if (!title || !amount || !currency || !categoryId || !profitgoalId || !createdAt) 
            return res.status(400).json({ error: 'All required fields must be provided.' });

        // Check if the start date is in the future
        if (new Date(startDate) > new Date()) 
            return res.status(400).json({ error: 'Start date cannot be in the future.' });

        // Check if the end date is after the start date
        if (new Date(endDate) <= new Date(startDate)) 
            return res.status(400).json({ error: 'End date must be after start date.' });

        // Create the new fixed income entry in the database
        const fixedIncome = await FixedIncome.create({
            title,
            description,
            amount,
            currency,
            startDate,
            endDate,
            categoryId,
            profitgoalId,  // Match the database field exactly!
        });

        // Return success response
        res.status(201).json({ message: 'Fixed income added successfully.', data: fixedIncome });
        }catch (error) {
            console.error("Error adding fixed income:", error);
            res.status(500).json({ error: 'Internal server error.', details: error.message });
        }
        
};




//fetch all the fixed income 
const getAllFixedIncomes = async (req, res) => {
    try {
        console.log('Attempting to fetch Fixed Incomes with Category inclusion...');

        const fixedIncomes = await FixedIncome.findAll({ 
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

        console.log('Fetched Fixed Incomes:', fixedIncomes);

        return res.status(200).json({ data: fixedIncomes });
    } catch (error) {
        console.error('Error fetching fixed incomes:', error.message);
        console.error('Error stack:', error.stack);

        return res.status(500).json({ error: 'Internal server error.', details: error.message });
    }
};




// Soft delete a Fixed Income by ID
const deleteFixedIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const fixedIncome = await FixedIncome.findByPk(id);
        if (!fixedIncome) {
            return res.status(404).json({ error: 'Fixed income not found.' });
        }

        // Perform soft delete by updating is_deleted column
        await fixedIncome.update({ isDeleted: true });

        return res.status(200).json({ message: 'Fixed income marked as deleted successfully.' });
    } catch (error) {
        console.error('Error deleting fixed income:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

//update a fixed income 
const updateFixedIncome = async (req, res) => {
    try {
        const { id } = req.params; // Get FixedIncome ID from request parameters
        const updatedData = req.body; // Get updated fields from request body

        console.log(`Updating Fixed Income with ID: ${id}`);

        // Check if the Fixed Income exists
        const fixedIncome = await FixedIncome.findByPk(id);
        if (!fixedIncome) {
            return res.status(404).json({ error: "Fixed Income not found." });
        }

        // Update the Fixed Income record
        await fixedIncome.update(updatedData);

        console.log(`Fixed Income with ID: ${id} updated successfully.`);
        
        return res.status(200).json({ message: "Fixed Income updated successfully.", data: fixedIncome });
    } catch (error) {
        console.error("Error updating Fixed Income:", error.message);
        return res.status(500).json({ error: "Internal server error.", details: error.message });
    }
};





module.exports = { addFixedIncome, getAllFixedIncomes, deleteFixedIncome,updateFixedIncome };
