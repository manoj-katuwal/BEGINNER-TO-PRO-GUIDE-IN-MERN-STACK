import express from "express";
import mongoose from "mongoose"; // Changed from require to import
import addRoutes from "./routes/add.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/products", addRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/demo')
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
