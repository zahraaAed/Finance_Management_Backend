const express = require('express');
const router = express.Router();
const { addFixedIncome, getAllFixedIncomes, deleteFixedIncome } = require('../Controllers/fixedIncomeController');

// Route to add a new fixed income
router.post('/addfixed-incomes', addFixedIncome);//done

// Route to get all fixed incomes
router.get('/fixed-incomes', getAllFixedIncomes);//done

// Route to delete a fixed income by ID
router.delete('/fixed-incomes/:id', deleteFixedIncome);//done

module.exports = router;
