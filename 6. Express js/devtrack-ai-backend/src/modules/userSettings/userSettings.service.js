import logger from "../../config/logger.js";
import {
  createSettings,
  findByUserId,
  updateSettings,
} from "./userSettings.repository.js";

export const getUserSettings = async (userId) => {
  try {
    let settings = await findByUserId(userId);

    if (!settings) {
      logger.info("User settings not found; creating default settings", {
        userId,
      });
      settings = await createSettings(userId);
    }

    logger.info("User settings fetched successfully", { userId });
    return settings;
  } catch (error) {
    logger.error("Failed to fetch user settings", {
      userId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export const updateUserSettings = async (userId, data) => {
  try {
    let settings = await findByUserId(userId);

    if (!settings) {
      logger.info(
        "User settings not found before update; creating default settings",
        {
          userId,
        },
      );
      settings = await createSettings(userId);
    }

    await updateSettings(userId, data);

    const updatedSettings = await findByUserId(userId);

    logger.info("User settings updated successfully", {
      userId,
      updatedFields: Object.keys(data || {}),
    });

    return updatedSettings;
  } catch (error) {
    logger.error("Failed to update user settings", {
      userId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};
