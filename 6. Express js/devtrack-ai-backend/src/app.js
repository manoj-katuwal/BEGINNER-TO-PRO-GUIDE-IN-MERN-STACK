import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DEVTRACK AI BACKEND IS RUNNING");

  res.status(200).json({
    success: true,
    message: "DEVTRACK AI BACKEND IS RUNNING",
  });
});

export default app;
