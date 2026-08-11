import GithubOAuthState from "./githubOAuthState.model.js";
import GithubAccount from "./githubAccount.model.js";

export const createOAuthState = async (data) => {
  return await GithubOAuthState.create(data);
};

export const findOAuthState = async (state) => {
  return await GithubOAuthState.findOne({
    where: {
      state,
    },
  });
};

export const createGithubAccount = async (data) => {
  return await GithubAccount.create(data);
};

export const deleteOAuthState = async (state) => {
  return await GithubOAuthState.destroy({
    where: {
      state,
    },
  });
};

export const findGithubAccountByUserId = async (userId) => {
  return await GithubAccount.findOne({
    where: {
      userId,
    },
  });
};

export const updateGithubAccount = async (userId, data) => {
  const [updated] = await GithubAccount.update(data, {
    where: {
      userId,
    },
  });

  return updated;
};
