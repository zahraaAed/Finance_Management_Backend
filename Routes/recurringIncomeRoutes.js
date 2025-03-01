const express = require('express');
const router = express.Router();
const { addRecurringIncome, getAllRecurringIncomes, deleteRecurringIncome } = require('../Controllers/recurringIncomeController');

// Route to add a new recurring income
router.post('/recurring-incomes', addRecurringIncome);

// Route to get all recurring incomes
router.get('/recurring-incomes', getAllRecurringIncomes);

// Route to delete a recurring income by ID
router.delete('/recurring-incomes/:id', deleteRecurringIncome);

module.exports = router;
