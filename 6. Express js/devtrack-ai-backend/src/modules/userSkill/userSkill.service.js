import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import { logAuthEvent } from "../../shared/utils/logAuthEvent.js";
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
    logAuthEvent({
      level: "warn",
      event: "USER_SKILL_CREATE_FAILED",
      message: "Skill creation attempted for an existing skill",
      userId,
    });

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

  if (!skill) {
    logAuthEvent({
      level: "warn",
      event: "USER_SKILL_UPDATE_FAILED",
      message: "Skill update attempted for missing skill",
      userId,
    });

    throw new AppError(AUTH_MESSAGES.SKILL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  const updatedData = await skill.update(data);

  return updatedData;
};

export const deleteUserSkills = async (skillId, userId) => {
  const deletedCount = await userSkillRepository.deleteSkill(skillId, userId);

  if (deletedCount === 0) {
    logAuthEvent({
      level: "warn",
      event: "USER_SKILL_DELETE_FAILED",
      message: "Skill delete attempted for missing skill",
      userId,
    });

    throw new AppError(AUTH_MESSAGES.SKILL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return;
};
