import express from "express";
import healthRoutes from "./health/health.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";
import requestId from "./middlewares/requestId.js";
import userRoutes from "./modules/user/user.routes.js";
import userSkillRoutes from "./modules/userSkill/userSkill.routes.js";

const app = express();

app.use(requestId);
app.use(express.json());

//routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/users", userSkillRoutes);

//404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl} on this server`,
    requestId: req.requestId,
  });
});

//globar error handler
app.use(errorHandler);

export default app;
