import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getSkillController } from "./userSkill.controller.js";


const router = express.Router();

router.get("/", authenticate, getSkillController);




export default router;