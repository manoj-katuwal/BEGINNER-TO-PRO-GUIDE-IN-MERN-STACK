import OAuthState, { GithubAccount } from "./github.model.js";

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

export const createGithubAccount = async (data) => {
  return await GithubAccount.create(data);
};

export const findGithubAccountByUserId = async (userId) => {
  return await GithubAccount.findOne({
    where: { userId },
  });
};

export const updateGithubAccount = async (userId, data) => {
  const githubAccount = await GithubAccount.findOne({
    where: { userId },
  });

  if (!githubAccount) {
    return null;
  }

  return await githubAccount.update(data);
};

export const deleteGithubAccount = async (userId) => {
  return await GithubAccount.destroy({
    where: {
      userId,
    },
  });
};


