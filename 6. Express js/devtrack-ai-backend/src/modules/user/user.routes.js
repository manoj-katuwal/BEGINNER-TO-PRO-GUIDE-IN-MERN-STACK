import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getMeController, updateProfileController } from "./user.controller.js";

const router = express.Router();

router.get("/me" , authenticate , getMeController);
router.patch("/me" , authenticate , updateProfileController); 



export default router;