const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const userData = require("../models/user");
const { verifyJWT } = require("../middleware/verifyJWT");
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
  .get(registryProcess.getUsers)
  .post(upload.single("photo"), registryProcess.createUser)
  .put(registryProcess.updateUsers)
  .delete(registryProcess.deleteUsers);

router.route("/login").post(registryProcess.Login);

module.exports = router;
