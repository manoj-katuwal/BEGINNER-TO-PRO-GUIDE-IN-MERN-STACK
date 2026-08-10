import * as userSkillRepository from "./userSkill.repository.js";

export const getUserSkills = async (userId) => {
  const skills = await userSkillRepository.findByUserId(userId);

  return skills;
};

export const createUserSkills = async (userId, data) => {

  const skillsdata = {
    userId ,
    ...data
  }
  const newSkill = await userSkillRepository.createSkill(skillsdata);

  return newSkill;
};
