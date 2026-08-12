import express from "express";
import { deleteGithubAccount, getGithubAccount, githubAuth, githubCallback } from "./github.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/auth", authenticate, githubAuth);
router.get("/callback", githubCallback);
router.get("/me", authenticate, getGithubAccount);
router.delete("/me", authenticate, deleteGithubAccount);

export default router;
