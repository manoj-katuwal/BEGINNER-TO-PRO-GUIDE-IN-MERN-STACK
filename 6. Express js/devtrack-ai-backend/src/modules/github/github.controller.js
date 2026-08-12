import asyncHandler from "../../shared/utils/asyncHandler.js";
import { generateOAuthState } from "../../shared/utils/generateOAuthState.js";
import * as githubService from "./github.service.js";
import AppError from "../../shared/utils/AppError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import { GITHUB_OAUTH_MESSAGES } from "../../constants/messages.js";
import { successResponse } from "../../shared/utils/apiResponse.js";

export const githubAuth = asyncHandler(async (req, res) => {
  const state = generateOAuthState();
  console.log("OAUTH STATE: ", state);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await githubService.saveOAuthState(req.user.id, state, expiresAt);
  const githubUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
    `&state=${state}`;

  res.redirect(githubUrl);
});

export const githubCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    throw new AppError(
      "GitHub OAuth callback is missing code or state.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const oauthState = await githubService.getOAuthState(state);
  console.log("Searching for state:", state);
  console.log("OAuth state result:", oauthState);

  if (!oauthState) {
    throw new AppError(
      "Invalid or unknown OAuth state.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const isExpired = new Date(oauthState.expiresAt).getTime() < Date.now();

  if (isExpired) {
    throw new AppError(
      "OAuth state has expired. Please try again.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  console.log("OAuth state is valid");
  console.log("DevTrack User ID:", oauthState.userId);
  console.log("GitHub Code:", code);

  const tokenData = await githubService.exchangeCodeForToken(code);

  await githubService.deleteOAuthState(state);

  console.log("Token exchange successful");
  console.log("TOKEN DATA", tokenData);
  console.log("ACCESS TOKEN ", tokenData.access_token);

  const githubProfile = await githubService.getGithubProfile(
    tokenData.access_token,
  );

  const githubAccount = await githubService.saveGithubAccount(
    oauthState.userId,
    githubProfile,
    tokenData.access_token,
  );

  successResponse(res, HTTP_STATUS.OK, GITHUB_OAUTH_MESSAGES.CONNECT_SUCCESS, {
    githubId: githubAccount.githubId,
    githubUsername: githubAccount.githubUsername,
  });
});

export const getGithubAccount = asyncHandler(async (req, res) => {
  const githubAccount = await githubService.getGithubAccount(req.user.id);

  if (!githubAccount) {
    throw new AppError(
      "No GitHub account is connected to this user.",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  successResponse(
    res,
    HTTP_STATUS.OK,
    "GitHub account retrieved successfully.",
    {
      githubId: githubAccount.githubId,
      githubUsername: githubAccount.githubUsername,
      avatarUrl: githubAccount.avatarUrl,
      profileUrl: githubAccount.profileUrl,
      connectedAt: githubAccount.connectedAt,
    },
  );
});

export const deleteGithubAccount = asyncHandler(async (req, res) => {
  const deletedCount = await githubService.deleteGithubAccount(req.user.id);

  if (!deletedCount) {
    throw new AppError(
      "No GitHub account is connected to this user.",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  successResponse(
    res,
    HTTP_STATUS.OK,
    GITHUB_OAUTH_MESSAGES.DISCONNECT_SUCCESS,
  );
});