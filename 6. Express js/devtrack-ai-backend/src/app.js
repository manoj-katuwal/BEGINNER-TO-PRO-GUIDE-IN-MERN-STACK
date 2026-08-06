import express from "express";
import healthRoutes from "./health/health.routes.js";


const app = express();

app.use(express.json());
app.use("/api/v1", healthRoutes);



export default app;
