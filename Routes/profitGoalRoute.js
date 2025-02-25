import express from "express";
import { createProfitGoals, deleteProfitGoal, getAllProfitGoals, getProfitGoalById, updateProfitGoal } from "../Controllers/profitController";
const router =express.Router();

router.post("/add",createProfitGoals );
router.get("/get/all", getAllProfitGoals);
router.get("/get/:id", getProfitGoalById);
router.delete("/delete/:id", deleteProfitGoal)
router.patch("/update/:id", updateProfitGoal)




export default router;