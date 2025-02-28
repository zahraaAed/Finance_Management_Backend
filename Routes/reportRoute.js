const express = require("express");
const { 
    createReport, 
    deleteReport, 
    getAllReports, 
    getReportById, 
    getReportByUserId, 
    updateReport 
} = require("../Controllers/reportController.js");

const router = express.Router();

router.post("/add", createReport);
router.get("/getAll", getAllReports);
router.get("/get/:id", getReportById);
router.get("/get/user/:id", getReportByUserId);
router.delete("/report/:id", deleteReport);
router.patch("/update/:id", updateReport);

module.exports = router;
