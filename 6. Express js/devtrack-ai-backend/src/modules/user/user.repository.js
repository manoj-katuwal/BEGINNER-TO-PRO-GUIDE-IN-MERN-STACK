import User from "../../modules/auth/auth.model.js";

export const findById = async (userId) => {
  return await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });
};
