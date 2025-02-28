const express = require("express");
const {  
    createsuperAdmin,
    getAllSuperAdmins, 
    getSuperAdminById 
} = require("../Controllers/superAdminController.js");

const router = express.Router();

router.post("/add/superadmin", createsuperAdmin);
router.get('/superadmins', getAllSuperAdmins);
router.get('/superadmin/:id', getSuperAdminById);

module.exports = router;
