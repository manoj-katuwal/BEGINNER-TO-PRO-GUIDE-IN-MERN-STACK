import express from "express";
import { githubAuth } from "./github.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/auth",authenticate,  githubAuth);

export default router;
