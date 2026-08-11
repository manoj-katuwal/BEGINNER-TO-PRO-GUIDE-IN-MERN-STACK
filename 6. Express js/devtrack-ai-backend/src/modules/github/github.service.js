import * as githubRepository from "./github.repository.js";
import AppError from "../../shared/utils/AppError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import { encrypt } from "../../shared/utils/encrypt.js";
import { decrypt } from "../../shared/utils/decrypt.js";
import { getGithubUser as getGithubUserFromClient } from "./github.client.js";

export const createOAuthState = async (state, userId) => {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  return await githubRepository.createOAuthState({
    state,
    userId,
    expiresAt,
  });
};

export const verifyOAuthState = async (state) => {
  const oauthState = await githubRepository.findOAuthState(state);

  if (!oauthState) {
    throw new Error("Invalid OAuth state");
  }

  if (oauthState.expiresAt < new Date()) {
    throw new Error("OAuth state has expired");
  }

  return oauthState;
};

export const exchangeCodeForToken = async (code) => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
    }),
  });

  const responseText = await response.text();
  let data = {};

  try {
    data = JSON.parse(responseText);
  } catch {
    data = Object.fromEntries(new URLSearchParams(responseText).entries());
  }

  if (!response.ok || data.error || !data.access_token) {
    throw new AppError(
      "Failed to exchange GitHub authorization code",
      HTTP_STATUS.BAD_GATEWAY,
    );
  }

  return data.access_token;
};

export const getGithubUser = async (accessToken) => {
  return await getGithubUserFromClient(accessToken);
};

export const deleteOAuthState = async (state) => {
  return await githubRepository.deleteOAuthState(state);
};

export const saveGithubAccount = async ({
  userId,
  githubUser,
  accessToken,
}) => {
  if (!accessToken) {
    throw new AppError(
      "GitHub access token is missing",
      HTTP_STATUS.BAD_GATEWAY,
    );
  }

  const encryptedAccessToken = encrypt(accessToken);

  if (!encryptedAccessToken) {
    throw new AppError(
      "Failed to encrypt GitHub access token",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }

  const data = {
    userId,
    githubId: githubUser.id,
    githubUsername: githubUser.login,
    avatarUrl: githubUser.avatar_url,
    encryptedAccessToken,
  };

  const existingAccount =
    await githubRepository.findGithubAccountByUserId(userId);

  if (existingAccount) {
    await githubRepository.updateGithubAccount(userId, data);
    return await githubRepository.findGithubAccountByUserId(userId);
  }

  return await githubRepository.createGithubAccount(data);
};

export const getGithubProfile = async (userId) => {
  const githubAccount = await githubRepository.findGithubAccountByUserId(userId);

  if (!githubAccount) {
    throw new Error("GitHub account not connected");
  }

  const accessToken = decrypt(githubAccount.encryptedAccessToken);

  const githubUser = await getGithubUser(accessToken);

  return githubUser;
};
