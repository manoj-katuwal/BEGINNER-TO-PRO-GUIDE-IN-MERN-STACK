
import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export const getGithubUser = async (accessToken) => {
  if (!accessToken) {
    throw new Error("GitHub access token is required");
  }

  const response = await githubApi.get("/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
