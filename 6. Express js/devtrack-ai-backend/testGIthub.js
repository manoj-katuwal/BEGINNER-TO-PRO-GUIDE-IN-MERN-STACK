import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import { getGithubProfile } from "./src/modules/github/github.service.js";

dotenv.config();

const test = async () => {
  try {
    await sequelize.authenticate();

    const userId = 1; // आफ्नो actual user ID राख

    const account = await getGithubProfile(userId);

    console.log("GitHub Account:");
    console.log(account);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await sequelize.close();
  }
};

test();
