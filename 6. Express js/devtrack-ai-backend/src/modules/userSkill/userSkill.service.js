import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import * as userSkillRepository from "./userSkill.repository.js";

export const getUserSkills = async (userId) => {
  const skills = await userSkillRepository.findByUserId(userId);

  return skills;
};

export const createUserSkills = async (userId, data) => {

  const existingSkill = await userSkillRepository.findByUserIdAndName(userId , data.name);

  if(existingSkill){
    throw new AppError(AUTH_MESSAGES.SKILL_ALREADY_EXISTS , HTTP_STATUS.CONFLICT)
  }

  const skillsdata = {
    userId ,
    ...data
  }
  const newSkill = await userSkillRepository.createSkill(skillsdata);

  return newSkill;
};
