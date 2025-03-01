const express = require('express');
const router = express.Router();
const { addFixedIncome, getAllFixedIncomes, deleteFixedIncome } = require('../Controllers/fixedIncomeController');

// Route to add a new fixed income
router.post('/fixed-incomes', addFixedIncome);

// Route to get all fixed incomes
router.get('/fixed-incomes', getAllFixedIncomes);

// Route to delete a fixed income by ID
router.delete('/fixed-incomes/:id', deleteFixedIncome);

module.exports = router;
