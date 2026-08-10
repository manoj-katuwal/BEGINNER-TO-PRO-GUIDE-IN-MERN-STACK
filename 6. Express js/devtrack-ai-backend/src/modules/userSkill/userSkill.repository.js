import UserSkill from "./userSkill.model.js";

export const findByUserId = async (userId) => {
  return await UserSkill.findAll({
    where: { userId },
  });
};
