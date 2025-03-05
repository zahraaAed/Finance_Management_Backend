const express = require('express');
const router = express.Router();
const { addRecurringIncome, getAllRecurringIncomes, deleteRecurringIncome } = require('../Controllers/recurringIncomeController');

// Route to add a new recurring income
router.post('/addrecurring-incomes', addRecurringIncome);//done

// Route to get all recurring incomes
router.get('/recurring-incomes', getAllRecurringIncomes);//done

// Route to delete a recurring income by ID
router.delete('/recurring-incomes/:id', deleteRecurringIncome);//done

module.exports = router;
