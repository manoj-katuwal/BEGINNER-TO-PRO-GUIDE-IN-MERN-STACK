import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import { getGithubProfile } from "./src/modules/github/github.service.js";

dotenv.config();

const test = async () => {
  try {
    await sequelize.authenticate();

    const userId = 1;

    const githubUser = await getGithubProfile(userId);

    console.log({
      id: githubUser.id,
      login: githubUser.login,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
    });
  } catch (error) {
    console.error("GitHub test failed:", error.message);
  } finally {
    await sequelize.close();
  }
};

test();
