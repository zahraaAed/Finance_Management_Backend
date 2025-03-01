const express = require("express");
const {  
    createsuperAdmin,
    getAllSuperAdmins, 
    getSuperAdminById 
} = require("../Controllers/superAdminController.js");

const router = express.Router();

router.post("/add", createsuperAdmin);
router.get('/get', getAllSuperAdmins);
router.get('/get/:id', getSuperAdminById);

module.exports = router;
