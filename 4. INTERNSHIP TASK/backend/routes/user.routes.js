// import {  addProduct } from "../controllers/add.controllers.js";
import express from "express";
import { registerUser, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUserById);

export default router;