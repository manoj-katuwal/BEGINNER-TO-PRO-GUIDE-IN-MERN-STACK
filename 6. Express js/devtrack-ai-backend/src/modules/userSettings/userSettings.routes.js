import express from "express";
import {authenticate} from "../../middlewares/auth.middleware.js";
import {getUserSettingsController} from "./userSettings.controller.js";

const router = express.Router();

router.get("/me/settings", authenticate, getUserSettingsController);

export default router;
