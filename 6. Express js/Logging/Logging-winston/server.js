import express from "express";
import { logger } from "./utils/logger.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  logger.info("Incoming request", {
    event: "request",
    method: req.method,
    path: req.path,
    query: req.query,
  });
  next();
});

app.use(userRoutes);

app.get("/api/github", (req, res) => {
  logger.error("GitHub API failure simulated", {
    event: "githubApi",
    path: req.path,
  });
  return res.status(502).json({ error: "GitHub API failure simulated." });
});

app.get("/api/db/reconnect", (req, res) => {
  logger.debug("Simulated database reconnect", {
    event: "dbReconnect",
    path: req.path,
  });
  return res.status(200).json({ message: "Database reconnected successfully (simulated)." });
});

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`, { event: "serverStart", port: PORT });
});
