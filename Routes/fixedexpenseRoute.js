const express = require('express');
const router = express.Router();
const { addFixedExpense, getAllFixedExpenses, deleteFixedExpense } = require('../Controllers/fixedExpenseController.js');

// Route to add a new fixed expense
router.post('/addfixed-expenses', addFixedExpense);//done

// Route to get all fixed expenses
router.get('/fixed-expenses', getAllFixedExpenses);//done

// Route to delete a fixed expense by ID
router.delete('/fixed-expenses/:id', deleteFixedExpense);//done

module.exports = router;
