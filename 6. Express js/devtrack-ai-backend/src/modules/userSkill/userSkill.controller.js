import AUTH_MESSAGES from "../../constants/messages.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as userSkillService from "./userSkill.service.js";

export const getSkillController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const skills = await userSkillService.getUserSkills(userId);

  successResponse(res, HTTP_STATUS.OK, AUTH_MESSAGES.SKILL_FETCHED, skills);
});

export const createSkillController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const data = req.body;

  const skill = await userSkillService.createUserSkills(userId, data);

  successResponse(
    res,
    HTTP_STATUS.CREATED,
    AUTH_MESSAGES.SKILL_CREATE_SUCCESS,
    skill,
  );
});

export const updateSkillController = asyncHandler(async (req, res) => {
  const skillId = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  const updatedData = await userSkillService.updateUserSkills(
    skillId,
    userId,
    data,
  );
  console.log(updatedData);

  successResponse(
    res,
    HTTP_STATUS.OK,
    AUTH_MESSAGES.SKILL_UPDATE_SUCCESS,
    updatedData,
  );
});

export const deleteSkillController = asyncHandler(async (req, res) => {
  const skillId = req.params.id;
  const userId = req.user.id;

  await userSkillService.deleteUserSkills(skillId, userId);

  successResponse(res, HTTP_STATUS.OK, AUTH_MESSAGES.SKILL_DELETE_SUCCESS);
});
