
import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";
import "./modules/auth/auth.model.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database sync successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();
