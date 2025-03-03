const express = require('express');
const router = express.Router();
const { addRecurringExpense, getAllRecurringExpenses, deleteRecurringExpense } = require('../Controllers/recurringExpenseController');

// Route to add a new recurring expense
router.post('/addrecurring-expenses', addRecurringExpense);//done

// Route to get all recurring expenses
router.get('/recurring-expenses', getAllRecurringExpenses);//done

// Route to delete a recurring expense by ID
router.delete('/recurring-expenses/:id', deleteRecurringExpense);//done

module.exports = router;
