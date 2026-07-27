import express from "express";
import addRoutes from "./routes/add.routes.js"; // ध्यान दिनुहोस्: .js थप्नु अनिवार्य छ

const app = express();
const port = 3000;

app.use(express.json());

app.use("/products", addRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
