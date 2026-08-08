import express from "express";
import {
  login,
  register,
  refreshController,
  logoutController,
} from "./auth.controller.js";
import { validateLogin, validateRegister } from "./auth.validation.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

router.post("/refresh", refreshController);

router.post("/logout", logoutController);

export default router;
