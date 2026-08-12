import * as githubRepo from "./github.repository.js";
import axios from "axios";
// import { encrypt } from "../../shared/utils/encryption.js";
import { encrypt } from "../../shared/utils/encrypt.js";

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

export const getGithubProfile = async (accessToken) => {
  const response = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });
  console.log(response);
  console.log(response.data);

  return await response.data;
};

export const saveGithubAccount = async (userId, githubProfile, accessToken) => {
  const encryptedToken = encrypt(accessToken);

  const data = {
    userId,
    githubId: githubProfile.id,
    githubUsername: githubProfile.login,
    accessToken: encryptedToken,
    avatarUrl: githubProfile.avatar_url,
    profileUrl: githubProfile.html_url,
  };

  const existingAccount = await githubRepo.findGithubAccountByUserId(userId);

  if (existingAccount) {
    return await githubRepo.updateGithubAccount(userId, data);
  }

  return await githubRepo.createGithubAccount(data);
};

export const getGithubAccount = async (userId) => {
  return await githubRepo.findGithubAccountByUserId(userId);
};

export const deleteGithubAccount = async (userId) => {
  return await githubRepo.deleteGithubAccount(userId);
};

export const getGithubRepositories = async (accessToken) => {
  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },

    params: {
      per_page: 100,
      sort: "updated",
    },
  });

  return response.data;
};

export const calculateRepositoryAnalytics = (repositories) => {
  const totalRepositories = repositories.length;

  const publicRepositories = repositories.filter(
    (repo) => !repo.private,
  ).length;

  const privateRepositories = repositories.filter(
    (repo) => repo.private,
  ).length;

  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0,
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0,
  );

  const languages = [
    ...new Set(repositories.map((repo) => repo.language).filter(Boolean)),
  ];

  return {
    totalRepositories,
    publicRepositories,
    privateRepositories,
    totalStars,
    totalForks,
    languages,
  };
};

export const getRepositoryCommits = async (accessToken, owner, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      params: {
        per_page: 100,
      },
    },
  );

  return response.data;
};

export const getGithubCommitAnalytics = async (userId) => {
  const githubAccount = await githubRepo.findGithubAccountByUserId(userId);

  if (!githubAccount) {
    throw new AppError(
      "No GitHub account is connected to this user.",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  const accessToken = decrypt(githubAccount.accessToken);

  const repositories = await getGithubRepositories(userId);

  const commitResults = await Promise.all(
    repositories.map((repo) =>
      getRepositoryCommits(accessToken, repo.owner.login, repo.name),
    ),
  );

  const commits = commitResults.flat();

  return {
    totalCommits: commits.length,
  };
};