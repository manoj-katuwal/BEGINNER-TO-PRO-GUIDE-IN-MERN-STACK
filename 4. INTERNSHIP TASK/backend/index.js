import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv";
import addRoutes from "./routes/add.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", addRoutes);

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
