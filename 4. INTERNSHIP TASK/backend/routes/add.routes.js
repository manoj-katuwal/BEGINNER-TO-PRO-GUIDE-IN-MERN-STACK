import {  addProduct } from "../controllers/add.controllers.js";
import express from "express";

const router = express.Router();

router.post("/add", addProduct);

export default router;