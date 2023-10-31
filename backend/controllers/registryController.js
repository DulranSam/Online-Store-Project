const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const userModel = require("../models/user");
require("dotenv").config;
const accessTokenx = process.env.ACCESS_TOKEN;
const refreshToken = process.env.REFRESH_TOKEN;

async function getUsers(req, res) {
  const users = await userModel.find();
  res.json(users);
}

async function deleteUsers(req, res) {
  const { id, password } = req.body;

  try {
    if (!id || !password) {
      return res.status(400).json({ Error: "No id or password found" });
    }

    const user = await userModel.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ Error: "Invalid Password" });
    }

    const del = await userModel.findOneAndDelete({ _id: id });

    return res.status(200).json({ Alert: `User ${id} has been deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
}

async function updateUsers(req, res) {
  const { username, id } = req.body;

  if (!username || !id) {
    return res.status(400).json({ Error: "Username or id not provided" });
  }

  try {
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { username: username } };

    const result = await userModel.updateOne(filter, update);

    if (!result) {
      res.status(401).json({ Alert: "User not found" });
    } else {
      res.status(200).json({ Alert: `User ${username} updated` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
}

async function Login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ Error: "Username and password are required" });
  }

  try {
    const verify = await userModel.findOne({ username: username });

    if (!verify) {
      return res.status(401).json({ Error: "Unauthorized" });
    } else {
      const match = bcrypt.compareSync(password, verify.password);
      if (match) {
        const accessToken = jwt.sign(
          {
            username: verify,
          },
          accessTokenx,
          { expiresIn: "30s" }
        );

        const refreshTokenx = jwt.sign(
          {
            username: verify,
          },
          refreshToken,
          { expiresIn: "1d" }
        );
        res.cookie("jwt", refreshTokenx, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({ Alert: `User ${username} logged in` });
      } else {
        return res.status(401).json({ Error: "Unauthorized" });
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
}

module.exports = { getUsers, deleteUsers, Login, updateUsers };
