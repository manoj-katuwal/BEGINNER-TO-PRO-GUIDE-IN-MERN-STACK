import express from "express";

const app = express();

const cache = {};

app.get("/users", (req, res) => {
  if (cache.users) {
    console.log("Returned from Cache");

    return res.json(cache.users);
  }

  console.log("Fetching from Database");

  const users = [
    { id: 1, name: "Ram" },
    { id: 2, name: "Hari" },
  ];

  cache.users = users;

  res.json(users);
});

app.listen(3000);