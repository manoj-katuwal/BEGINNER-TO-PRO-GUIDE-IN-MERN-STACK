import { createSettings, findByUserId } from "./userSettings.repository.js";

export const getUserSettings = async (userId) => {
  let settings = await findByUserId(userId);

  if (!settings) {
    settings = await createSettings(userId);
  }

  return settings;
};
