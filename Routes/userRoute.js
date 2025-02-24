import express from "express";
import {  deleteAdmin, getAdminById, getAdmins, getAllAdmins, getAllSuperAdmins, getSuperAdminById} from "../Controllers/userController.js"

const router = express.Router();

router.get("/users", getAllAdmins);
router.get('/admin/:id', getAdminById);
router.delete('/admin/:id', deleteAdmin);
router.get('/admin', getAdmins)
router.get('/superadmins', getAllSuperAdmins)
router.get('/superadmin/:id', getSuperAdminById)

export default router;