import express from "express";
import { register } from "./auth.controller.js";
import { validateRegister } from "./auth.validation.js";

const router = express.Router();

router.post("/register",validateRegister, register);




export default router;