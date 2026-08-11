import {
  createSettings,
  findByUserId,
  updateSettings,
} from "./userSettings.repository.js";

export const getUserSettings = async (userId) => {
  let settings = await findByUserId(userId);

  if (!settings) {
    settings = await createSettings(userId);
  }

  return settings;
};

export const updateUserSettings = async (userId, data) => {
  let settings = await findByUserId(userId);

  if (!settings) {
    settings = await createSettings(userId);
  }

  await updateSettings(userId, data);

  return await findByUserId(userId);
};
