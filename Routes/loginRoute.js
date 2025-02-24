import express from "express";
import {createUser,signInUser} from "../Controllers/userController.js"

const router = express.Router();

router.post("/createUser", createUser);

router.post('/signin',signInUser);


export default router;