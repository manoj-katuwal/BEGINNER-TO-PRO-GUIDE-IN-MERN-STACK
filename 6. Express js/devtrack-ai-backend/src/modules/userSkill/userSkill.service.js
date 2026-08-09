import * as userSkillRepository from "./userSkill.repository.js";

export const getUserSkills = async (userId) => {
  const skills = await userSkillRepository.findByUserId(userId);

  return skills;
};
