import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { connectGithub , githubCallback} from "./github.controller.js";

const router = express.Router();

router.get("/connect", authenticate, connectGithub);
router.get("/callback", githubCallback);


export default router;
