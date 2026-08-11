import crypto from "crypto";

export const connectGithub = async (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  console.log("OAuth State:", state);

  const githubUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_CALLBACK_URL}` +
    `&scope=read:user` +
    `&state=${state}`;

  res.redirect(githubUrl);
};
