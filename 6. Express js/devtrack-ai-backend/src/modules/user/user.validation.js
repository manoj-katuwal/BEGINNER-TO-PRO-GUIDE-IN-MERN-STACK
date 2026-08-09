import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  bio: Joi.string().trim().max(500),
  location: Joi.string().trim().max(100),
  profilePicture: Joi.string().uri(),
  githubUsername: Joi.string().trim().max(39),
  linkedin: Joi.string().uri(),
  website: Joi.string().uri(),
}).unknown(false);
