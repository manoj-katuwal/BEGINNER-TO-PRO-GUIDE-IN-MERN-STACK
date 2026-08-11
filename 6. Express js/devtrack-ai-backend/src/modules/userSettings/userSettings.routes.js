import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  getUserSettingsController,
  updateUserSettingsController,
} from "./userSettings.controller.js";
import { validate } from "../../middlewares/validate.js";
import { updateUserSettingsSchema } from "./userSettings.validation.js";

const router = express.Router();

router.get("/me/settings", authenticate, getUserSettingsController);
router.patch(
  "/me/settings",
  authenticate,
  validate(updateUserSettingsSchema),
  updateUserSettingsController,
);

export default router;
