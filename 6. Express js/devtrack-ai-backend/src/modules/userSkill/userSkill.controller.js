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
