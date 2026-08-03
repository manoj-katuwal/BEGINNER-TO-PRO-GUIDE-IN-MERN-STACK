const express = require("express");
const app = express();
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// const MONGO_URL = "mongodb://admin:qwerty@mongo:27017";
const MONGO_URL = "mongodb://admin:qwerty@127.0.0.1:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

//GET all users
app.get("/getUsers", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("manoj-db");
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  } finally {
    await client.close();
  }
});

//POST new user
app.post("/addUser", async (req, res) => {
  const userObj = req.body;
  console.log(req.body);

  try {
    await client.connect();
    const db = client.db("apnacollege-db");
    const data = await db.collection("users").insertOne(userObj);
    console.log(data);
    console.log("data inserted in DB");
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to add user");
  } finally {
    await client.close();
  }
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});