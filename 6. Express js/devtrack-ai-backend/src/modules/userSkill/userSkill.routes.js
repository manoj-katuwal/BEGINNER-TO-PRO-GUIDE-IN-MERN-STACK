import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { createSkillController, getSkillController } from "./userSkill.controller.js";


const router = express.Router();

router.get("/me/skills", authenticate, getSkillController);
router.post("/me/skills" , authenticate , createSkillController);




export default router;