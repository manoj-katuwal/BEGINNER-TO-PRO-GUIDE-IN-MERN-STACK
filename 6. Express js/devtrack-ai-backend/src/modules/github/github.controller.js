import asyncHandler from "../../shared/utils/asyncHandler.js";
import { generateOAuthState } from "../../shared/utils/generateOAuthState.js";

export const githubAuth = asyncHandler(async (req, res) => {
  const state = generateOAuthState();
  console.log("OAUTH STATE: ", state);
  const githubUrl =
    ` https://github.com/login/oauth/authorize` +
    `?clinet_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` + 
    `&state=${state}`;

  res.redirect(githubUrl);
});
