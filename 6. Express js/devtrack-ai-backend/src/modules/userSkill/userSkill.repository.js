import UserSkill from "./userSkill.model.js";

export const findByUserId = async (userId) => {
  return await UserSkill.findAll({
    where: { userId },
  });
};


export const createSkill = async (data) => {
    return await UserSkill.create(data);
}


export const findByUserIdAndName = async (userId, name) => {
  return await UserSkill.findOne({
    where: {
      userId,
      name,
    },
  });
};
