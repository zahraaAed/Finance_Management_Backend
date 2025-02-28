const express = require("express");
const { 
    createProfitGoals, 
    deleteProfitGoal, 
    getAllProfitGoals, 
    getProfitGoalById, 
    updateProfitGoal 
} = require("../Controllers/profitController.js");

const router = express.Router();

router.post("/add", createProfitGoals);
router.get("/get/all", getAllProfitGoals);
router.get("/get/:id", getProfitGoalById);
router.delete("/delete/:id", deleteProfitGoal);
router.patch("/update/:id", updateProfitGoal);

module.exports = router;
