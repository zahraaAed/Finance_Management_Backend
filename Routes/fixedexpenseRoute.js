const express = require('express');
const router = express.Router();
const { addFixedExpense, getAllFixedExpenses, deleteFixedExpense } = require('../Controllers/fixedExpenseController');

// Route to add a new fixed expense
router.post('/fixed-expenses', addFixedExpense);

// Route to get all fixed expenses
router.get('/fixed-expenses', getAllFixedExpenses);

// Route to delete a fixed expense by ID
router.delete('/fixed-expenses/:id', deleteFixedExpense);

module.exports = router;
