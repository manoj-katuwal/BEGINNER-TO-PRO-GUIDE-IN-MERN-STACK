import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { connectGithub } from "./github.controller.js";

const router = express.Router();

router.get("/connect", authenticate, connectGithub);

export default router;
