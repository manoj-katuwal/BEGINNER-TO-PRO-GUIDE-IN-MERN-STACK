import express from "express";
import {
  deleteGithubAccount,
  getGithubAccount,
  getGithubRepositories,
  getRepositoryAnalytics,
  githubAuth,
  githubCallback,
} from "./github.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/auth", authenticate, githubAuth);
router.get("/callback", githubCallback);
router.get("/me", authenticate, getGithubAccount);
router.get("/repositories", authenticate, getGithubRepositories);
router.get("/repositories/analytics", authenticate, getRepositoryAnalytics);
router.delete("/me", authenticate, deleteGithubAccount);

export default router;
