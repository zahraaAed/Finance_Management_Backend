import express from "express";
import { createReport, deleteReport, getAllReports, getReportById, getReportByUserId } from "../Controllers/reportController";
const router =express.Router();

router.post("/add", createReport);
router.get("/getAll", getAllReports);
router.get("/get/:id", getReportById);
router.get("/get/user/:id", getReportByUserId);
router.delete("/report/:id", deleteReport);

export default router;