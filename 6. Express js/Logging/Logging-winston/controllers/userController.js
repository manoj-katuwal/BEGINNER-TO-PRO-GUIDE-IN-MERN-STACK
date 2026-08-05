import { logger } from "../utils/logger.js";

export const registerUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new Error("Name and email are required for registration.");
    }

    logger.info("User registered successfully", {
      event: "registerUser",
      name,
      email,
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    logger.error("registerUser failed", {
      event: "registerUser",
      message: error.message,
    });
    return res.status(400).json({ error: error.message });
  }
};

export const updateProfile = (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;

    if (!id) {
      throw new Error("Profile ID is required.");
    }

    logger.info("User profile updated", {
      event: "updateProfile",
      userId: id,
      updatedFields: Object.keys(profileData),
    });

    return res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    logger.error("updateProfile failed", {
      event: "updateProfile",
      message: error.message,
    });
    return res.status(400).json({ error: error.message });
  }
};
