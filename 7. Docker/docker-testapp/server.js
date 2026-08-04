const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// URL-encode password to handle special characters
const MONGO_URL =
  `mongodb://admin:${encodeURIComponent('qwerty')}@mongo:27017/?authSource=admin`;

const client = new MongoClient(MONGO_URL);

let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("manoj-db");
    console.log("Connected successfully to MongoDB");

    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

//GET all users
app.get("/getUsers", async (req, res) => {
  try {
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

//POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  console.log(req.body);

  try {
    const data = await db.collection("users").insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to add user");
  }
});

startServer();
