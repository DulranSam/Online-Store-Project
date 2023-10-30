const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const userData = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");
const registryProcess = require("../controllers/registryController");
require("dotenv").config;

const multerStore = multer.diskStorage({
  destination: (req, file, cb) => {
    const photofilename = `${Date.now()}.jpeg`;
    cb(null, path.join(__dirname, "public", "userpfps", photofilename));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage: multerStore });

router
  .route("/")
  .get( registryProcess.getUsers)
  .post(upload.single("photo"), async (req, res) => {
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

        const newUser = new userData({
          username,
          password: hashedPWD,
          confirmpass,
          photo: photofilename,
          bio,
          mail:mail.toLowerCase(),
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
  })
  .put(registryProcess.updateUsers)
  .delete(registryProcess.deleteUsers);

router.route("/login").post(registryProcess.Login);



module.exports = router;
