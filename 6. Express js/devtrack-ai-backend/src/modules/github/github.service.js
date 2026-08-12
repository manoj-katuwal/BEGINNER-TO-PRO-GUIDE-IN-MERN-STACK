import * as githubRepo from "./github.repository.js";
import axios from "axios";

export const saveOAuthState = async (userId, state, expiresAt) => {
  return await githubRepo.createOAuthState({
    userId,
    state,
    expiresAt,
  });
};

export const getOAuthState = async (state) => {
  return await githubRepo.findOAuthState(state);
};

export const exchangeCodeForToken = async (code) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
    },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  console.log(response);

  return response.data;
};

export const deleteOAuthState = async (state) => {
  return await githubRepo.deleteOAuthState(state);
};