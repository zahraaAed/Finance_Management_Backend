const express = require("express");
const { createUser, signInUser } = require("../Controllers/userController.js");
const { signInsuperAdmin } = require("../Controllers/superAdminController.js");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/signin", signInUser);
router.post("/signin/superadmin", signInsuperAdmin);
module.exports = router;
