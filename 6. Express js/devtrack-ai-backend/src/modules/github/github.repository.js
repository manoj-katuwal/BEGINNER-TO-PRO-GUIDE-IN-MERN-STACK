import OAuthState from "./github.model.js";

export const createOAuthState = async ({userId, state, expiresAt}) => {
  return await OAuthState.create({
    userId,
    state,
    expiresAt,
  });
};

export const findOAuthState = async (state) => {
    return await OAuthState.findOne({
        where : {state}
    })
}

export const deleteOAuthState = async (state) => {
  return await OAuthState.destroy({
    where: {
      state,
    },
  });
};

