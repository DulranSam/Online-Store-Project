const { ObjectId, MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config;
const accessTokenx = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;
let db;
const cluster = process.env.CLUSTER;

async function getUsers(req, res) {
  const collection = db.collection("users");
  const users = await collection.find().toArray();
  res.json(users);
}

async function deleteUsers(req, res) {
  const collection = db.collection("users");
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ Error: "No username or password found" });
    }

    const user = await collection.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ Error: "Invalid Password" });
    }

    const del = await collection.findOneAndDelete({ username: username });

    return res.status(200).json({ Alert: `User ${username} has been deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
}

async function updateUsers(req, res) {
  const collection = db.collection("users");
  const { username, id } = req.body;

  if (!username || !id) {
    return res.status(400).json({ Error: "Username or id not provided" });
  }

  try {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { username: username } };

    const result = await collection.updateOne(filter, update);

    if (!result) {
      res.status(401).json({ Alert: "User not found" });
    } else {
      res.status(200).json({ Alert: `User ${id} updated` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
}

async function Login(req, res) {
  const collection = db.collection("users");

  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ Error: "Username and password are required" });
  }

  try {
    const verify = await collection.findOne({ username: username });

    if (!verify) {
      return res.status(401).json({ Error: "Unauthorized" });
    } else {
      const match = bcrypt.compareSync(password, verify.password);
      if (match) {
     
        return res.status(200).json({ Alert: `User ${username} Logged in` });
        

        /*
        const accessToken = jwt.sign(
          {
            username: verify,
          },
          accessTokenx,
          { expiresIn: "30s" }
        );

        const refreshtoken = jwt.sign(
          {
            username: verify,
          },
          refreshToken,
          { expiresIn: "1d" }
        );
        */
      } else {
        return res.status(401).json({ Error: "Unauthorized" });
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
}

async function Connect() {
  try {
    const client = new MongoClient(cluster, { useNewUrlParser: true });
    await client.connect();
    db = client.db();
    console.log("Connected Data Verifiation");
  } catch (error) {
    console.error("Error connecting to Data Verification:", error);
    process.exit(1);
  }
}

Connect();

module.exports = { getUsers, deleteUsers, Login, updateUsers };
