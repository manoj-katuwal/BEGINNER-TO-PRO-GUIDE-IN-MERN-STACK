// import {  addProduct } from "../controllers/add.controllers.js";
import express from "express";
import { registerUser, getUserById, loginUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", auth, getUserById);

export default router;