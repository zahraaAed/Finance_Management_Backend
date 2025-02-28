const express = require("express");
const {  
    deleteAdmin, 
    getAdminById, 
    getAdmins, 
    getAllAdmins,
    createUser, 
 
} = require("../Controllers/userController.js");
const { verifyToken, isSuperAdmin } = require("../Middleware/auth.js");

const router = express.Router();
router.post("/add", createUser);
router.get("/users", getAllAdmins);
router.get('/admin/:id', getAdminById);
router.delete("/delete-admin/:id", verifyToken, isSuperAdmin, deleteAdmin);
router.get('/admin', getAdmins);


module.exports = router;
