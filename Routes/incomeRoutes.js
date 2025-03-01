const express = require("express");
const { addIncome, getIncomes, deleteIncome } = require("../Controllers/incomeController");

const router = express.Router();

router.post("/income", addIncome); // ✅ Add Fixed or Recurring Income
router.get("/income", getIncomes); // ✅ Get All Incomes
router.delete("/income/:type/:id", deleteIncome); // ✅ Delete Income

module.exports = router;
