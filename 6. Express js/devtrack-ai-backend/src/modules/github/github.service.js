import * as githubRepository from "./github.repository.js";
import AppError from "../../shared/utils/AppError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import { encrypt } from "../../shared/utils/encrypt.js";

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

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new AppError(
      "Failed to exchange GitHub authorization code",
      HTTP_STATUS.BAD_GATEWAY,
    );
  }

  return data.access_token;
};

export const getGithubUser = async (accessToken) => {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError("Failed to fetch GitHub user", HTTP_STATUS.BAD_GATEWAY);
  }

  return data;
};

export const deleteOAuthState = async (state) => {
  return await githubRepository.deleteOAuthState(state);
};

export const saveGithubAccount = async ({
  userId,
  githubUser,
  accessToken,
}) => {
  const encryptedAccessToken = encrypt(accessToken);

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
