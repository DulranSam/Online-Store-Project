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

    await userModel.findOneAndDelete({ _id: id });

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
      .sendStatus(400)
      .json({ Error: "Username and password are required" });
  }

  try {
    const verify = await userModel.findOne({ username: username });

    if (!verify) {
      return res.sendStatus(401).json({ Error: "Unauthorized" });
    } else {
      const match = bcrypt.compareSync(password, verify.password);
      if (match) {
        // const accessToken = jwt.sign(
        //   {
        //     username: verify,
        //   },
        //   accessTokenx,
        //   { expiresIn: "30s" }
        // );

        // const refreshTokenx = jwt.sign(
        //   {
        //     username: verify,
        //   },
        //   refreshToken,
        //   { expiresIn: "1d" }
        // );

        return res.sendStatus(200).json({
          Alert: `User ${username} logged in`,
        });
      } else {
        return res.sendStatus(401).json({ Error: "Unauthorized" });
      }
    }
  } catch (error) {
    console.error("Error in login:", error);
    return res.sendStatus(500).json({ Error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const { username, password, mail, bio, confirmpass } = req.body;

    if (!username || !password || !mail || username === password) {
      return res.status(400).json({
        error:
          "Required credentials (Username/Password & Mail) fields not filled",
      });
    } else if (password !== confirmpass) {
      return res
        .status(400)
        .json({ Alert: `${password} is not the same as confirmed password` });
    }

    const duplicate = await userData.findOne({ username });
    const maildup = await userData.findOne({ mail });

    if (!duplicate && !maildup) {
      let photofilename = null;

      if (req.file) {
        if (!req.file.mimetype.startsWith("image")) {
          return res
            .status(400)
            .json({ error: "Uploaded file is not an image" });
        }
        photofilename = `${Date.now()}.jpeg`;
        await sharp(req.file.buffer)
          .resize(480, 360)
          .jpeg({ quality: 60 })
          .toFile(
            path.join(__dirname, "public", "userpfps", photofilename),
            (err, info) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ error: "Image processing error" });
              }
            }
          );
      }

      const hashedPWD = await bcrypt.hash(password, 10);
      const hashConfirmedPass = await bcrypt.hash(confirmpass, 10);

      const newUser = new userData({
        username,
        password: hashedPWD,
        confirmpass: hashConfirmedPass,
        photo: photofilename,
        bio,
        mail: mail.toLowerCase(),
      });

      await newUser.save();
      return res
        .status(201)
        .json({ success: `User ${username} created successfully` });
    } else {
      return res
        .status(409)
        .json({ error: `User ${username} or email already exists` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getUsers, deleteUsers, Login, updateUsers, createUser };
