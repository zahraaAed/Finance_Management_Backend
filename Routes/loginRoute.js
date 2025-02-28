const express = require("express");
const { createUser, signInUser } = require("../Controllers/userController.js");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/signin", signInUser);

module.exports = router;
