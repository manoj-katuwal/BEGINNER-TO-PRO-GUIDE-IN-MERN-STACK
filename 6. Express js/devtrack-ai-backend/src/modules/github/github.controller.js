import asyncHandler from "../../shared/utils/asyncHandler.js";
import { generateOAuthState } from "../../shared/utils/generateOAuthState.js";
import * as githubService from "./github.service.js";

export const githubAuth = asyncHandler(async (req, res) => {
  const state = generateOAuthState();
  console.log("OAUTH STATE: ", state);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await githubService.saveOAuthState(req.user.id, state, expiresAt); 
  const githubUrl =
    ` https://github.com/login/oauth/authorize` +
    `?clinet_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` + 
    `&state=${state}`;

  res.redirect(githubUrl);
});


export const githubCallback = asyncHandler(async (req, res ) => {
    
})
