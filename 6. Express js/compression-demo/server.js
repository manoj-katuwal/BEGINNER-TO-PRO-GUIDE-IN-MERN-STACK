import express from "express";
import compression from "compression";

const app = express();

app.use(compression());

app.get("/users", (req, res) => {
  const users = [];

  for (let i = 1; i <= 5000; i++) {
    users.push({
      id: i,

      name: "Ram",

      age: 20,

      city: "Kathmandu",

      country: "Nepal",
    });
  }

  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
