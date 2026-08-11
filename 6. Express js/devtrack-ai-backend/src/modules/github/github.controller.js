import crypto from "crypto";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as githubService from "./github.service.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import { GITHUB_OAUTH_MESSAGES } from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";

export const connectGithub = asyncHandler(async (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  await githubService.createOAuthState(state, req.user.id);

  const githubUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
    `&scope=read:user` +
    `&state=${state}`;

  res.redirect(githubUrl);
});

export const githubCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    throw new AppError(
      "GitHub code and state are required",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  // 1. Verify OAuth state
  const oauthState = await githubService.verifyOAuthState(state);

  // 2. Exchange code for access token
  const accessToken = await githubService.exchangeCodeForToken(code);

  console.log("GitHub access token received:", Boolean(accessToken));

  // 3. Get GitHub user information
  const githubUser = await githubService.getGithubUser(accessToken);

  // 4. Encrypt token + save GitHub account
  const githubAccount = await githubService.saveGithubAccount({
    userId: oauthState.userId,
    githubUser,
    accessToken,
  });

  await githubService.deleteOAuthState(state);

  return successResponse(
    res,
    HTTP_STATUS.OK,
    GITHUB_OAUTH_MESSAGES.CONNECT_SUCCESS,
    {
      githubId: githubAccount.githubId,
      githubUsername: githubAccount.githubUsername,
    },
  );
});

// Uses the encrypted database token only on the server, then calls GitHub's API.
export const getGithubProfile = asyncHandler(async (req, res) => {
  const githubUser = await githubService.getGithubProfile(req.user.id);

  return successResponse(
    res,
    HTTP_STATUS.OK,
    "GitHub profile retrieved successfully",
    {
      githubId: githubUser.id,
      githubUsername: githubUser.login,
      name: githubUser.name,
      avatarUrl: githubUser.avatar_url,
    },
  );
});
