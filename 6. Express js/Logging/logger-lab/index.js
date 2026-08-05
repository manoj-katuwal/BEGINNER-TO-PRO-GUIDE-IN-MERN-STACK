// const express = require("express");
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("Logger Lab Has Been Started");
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
