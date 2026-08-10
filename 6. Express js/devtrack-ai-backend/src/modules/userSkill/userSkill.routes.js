import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  createSkillController,
  getSkillController,
  updateSkillController,
} from "./userSkill.controller.js";
import { validate } from "../../middlewares/validate.js";
import { userSkillsSchema } from "./userSkill.validation.js";

const router = express.Router();

router.get("/me/skills", authenticate, getSkillController);
router.post(
  "/me/skills",
  authenticate,
  validate(userSkillsSchema),
  createSkillController,
);

router.patch("/me/skills/:id", authenticate, updateSkillController);

export default router;
