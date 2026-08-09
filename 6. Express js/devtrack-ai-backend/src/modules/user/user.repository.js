import User from "../../modules/auth/auth.model.js";

export const findById = async (userId) => {
  return await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });
};

export const updateById = async (userId, updatedData) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  await user.update(updatedData);
  const updatedUser = await User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });

  return updatedUser;
};
