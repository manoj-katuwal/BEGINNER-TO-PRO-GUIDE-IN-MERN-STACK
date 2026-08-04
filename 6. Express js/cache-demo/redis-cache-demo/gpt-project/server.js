import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/Product.routes.js";
import redisClient from "./config/redis.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
// await connectDB();

app.use(express.json());
app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    await connectDB();

    await redisClient.connect();

    app.get("/", (req, res) => {
      res.send("Redis Cache API");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};


startServer();