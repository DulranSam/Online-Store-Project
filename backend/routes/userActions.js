const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const userData = require("../models/user");
const registryProcess = require("../controllers/registryController");
const verifyJWT = require("../middleware/verifyJWT");
let db;
require("dotenv").config;
const cluster = process.env.CLUSTER;

const multerStore = multer.diskStorage({
  destination: path.join(__dirname, "public"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpeg`);
  },
});
const upload = multer({ storage: multerStore });

router
  .route("/")
  .get(registryProcess.getUsers)
  .post(upload.single("photo"), async (req, res) => {
    const collection = db.collection("users");
    try {
      const { username, password, mail } = req.body;

      if (!username || !password || !mail || username === password) {
        return res
          .status(400)
          .json({
            error:
              "Required credentials (Username/Password & Mail) fields not filled",
          });
      }

      const duplicate = await collection.findOne({ username });
      const maildup = await collection.findOne({ mail: mail });

      if (!duplicate || !maildup) {
        let photofilename = null;

        if (req.file) {
          photofilename = `${Date.now()}.jpeg`;
          await sharp(req.file.buffer)
            .resize(480, 360)
            .jpeg({ quality: 60 })
            .toFile(path.join(__dirname, "public", "userpfps", photofilename));
        }

        const hashedPWD = await bcrypt.hash(password, 10);

        const newUser = new userData({
          username,
          password: hashedPWD,
          photo: photofilename,
          mail,
        });

        await newUser.save();
        return res
          .status(201)
          .json({ success: `User ${username} created successfully` });
      } else {
        return res
          .status(409)
          .json({ error: `User ${username} already exists` });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .put(registryProcess.updateUsers)
  .delete(registryProcess.deleteUsers);

router.route("/login").post(registryProcess.Login);


async function Connect() {
  try {
    const client = new MongoClient(cluster, { useNewUrlParser: true });
    await client.connect();
    db = client.db();
    console.log("userActions connected to Database");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

Connect();

module.exports = router;
