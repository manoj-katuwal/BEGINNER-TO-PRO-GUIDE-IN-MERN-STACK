import User from "./auth.model.js";

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

export const findById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, updates) => {
  const user = await User.findByPk(id);
  return await user.update(updates);
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  return await user.destroy();
};
