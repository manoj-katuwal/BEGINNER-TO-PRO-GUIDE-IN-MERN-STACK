import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import * as userSkillRepository from "./userSkill.repository.js";

export const getUserSkills = async (userId) => {
  const skills = await userSkillRepository.findByUserId(userId);

  return skills;
};

export const createUserSkills = async (userId, data) => {
  const existingSkill = await userSkillRepository.findByUserIdAndName(
    userId,
    data.name,
  );

  if (existingSkill) {
    throw new AppError(
      AUTH_MESSAGES.SKILL_ALREADY_EXISTS,
      HTTP_STATUS.CONFLICT,
    );
  }

  const skillsdata = {
    userId,
    ...data,
  };
  const newSkill = await userSkillRepository.createSkill(skillsdata);

  return newSkill;
};

export const updateUserSkills = async (id, userId, data) => {
  const skill = await userSkillRepository.findByIdAndUserId(id, userId);
  console.log(skill);

  if (!skill) {
    throw new AppError(AUTH_MESSAGES.SKILL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const updatedData = await skill.update(data);

  return updatedData;
};

export const deleteUserSkills = async (skillId, userId) => {
  const deletedCount = await userSkillRepository.deleteSkill(skillId, userId);

  if (deletedCount === 0) {
    throw new AppError(AUTH_MESSAGES.SKILL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return;
};
