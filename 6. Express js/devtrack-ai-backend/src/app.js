import express from "express";
import healthRoutes from "./health/health.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

//routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth",authRoutes );

//404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl} on this server`,
  });
});

//globar error handler
app.use(errorHandler);

export default app;
