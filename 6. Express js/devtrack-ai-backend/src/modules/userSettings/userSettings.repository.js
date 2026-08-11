import { userSettings } from "./userSettings.model.js";

export const findByUserId = async (userId) => {
  return await userSettings.findOne({
    where: { userId },
  });
};

export const createSettings = async (userId) => {
  return await userSettings.create({
    userId,
  });
};

export const updateSettings = async (userId, data) => {
  return await userSettings.update(data, {
    where: { userId },
  });
};
