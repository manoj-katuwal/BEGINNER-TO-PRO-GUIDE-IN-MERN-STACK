// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middleware/requestLogger.js";
dotenv.config();

const app = express();
app.use(requestLogger);
const PORT = process.env.PORT || 3000;

// const user = null;

// console.log(user.name);


app.get("/", (req, res) => {
    res.send("Logger Lab Has Been Started");
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
