import express from "express";
import { registerUser, updateProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.put("/profile/:id", authMiddleware, updateProfile);

export default router;
