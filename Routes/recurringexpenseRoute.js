const express = require('express');
const router = express.Router();
const { addRecurringExpense, getAllRecurringExpenses, deleteRecurringExpense } = require('../Controllers/recurringExpenseController.js');

// Route to add a new recurring expense
router.post('/recurring-expenses', addRecurringExpense);

// Route to get all recurring expenses
router.get('/recurring-expenses', getAllRecurringExpenses);

// Route to delete a recurring expense by ID
router.delete('/recurring-expenses/:id', deleteRecurringExpense);

module.exports = router;
