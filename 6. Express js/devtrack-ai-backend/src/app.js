import express from "express";
import healthRoutes from "./health/health.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
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

//routes
app.use("/api/v1", healthRoutes);

export default app;
