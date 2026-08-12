import OAuthState from "./github.model.js";

export const createOAuthState = async ({userId, state, expiresAt}) => {
  return await OAuthState.create({
    userId,
    state,
    expiresAt,
  });
};

