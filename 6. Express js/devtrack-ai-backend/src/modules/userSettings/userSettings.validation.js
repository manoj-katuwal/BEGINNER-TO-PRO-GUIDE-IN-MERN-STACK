import Joi from "joi";

export const updateUserSettingsSchema = Joi.object({
  theme: Joi.string().valid("light", "dark", "system"),
  language: Joi.string(),
  profileVisibility: Joi.string().valid("public", "private"),
  emailNotifications: Joi.boolean(),
  pushNotifications: Joi.boolean(),
}).unknown(false);

