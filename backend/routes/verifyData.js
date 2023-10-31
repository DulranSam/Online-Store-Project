const express = require("express");
const router = express.Router();
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");
const storeModel = require("../models/store");
const dataController = require("../controllers/dataController");

const multerStore = multer.diskStorage({
  destination: path.join(__dirname, "public"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.jpeg`);
  },
});
const upload = multer({ storage: multerStore });

router
  .route("/")
  .get(dataController.getItems)
  .post(upload.single("photo"), async (req, res) => {
    try {
      const { title, description, quantity, extra } = req.body;
      if (!title || !description || !quantity)
        return res
          .status(400)
          .json({ Error: "Please enter title , description and quantity" });
      const duplicate = await storeModel.findOne({
        title: title,
      });
      if (duplicate) {
        return res.status(409).json({ Error: `${title} already exists` });
      } else {
        let photofilename;
        if (req.file) {
          photofilename = `${Date.now()}.jpeg`;
          const compressed = await sharp(req.file.buffer)
            .resize(480, 360)
            .jpeg({ quality: 60 })
            .toFile(path.join(__dirname, "public", "itemimgs", photofilename));
          console.log(compressed);
        }

        const newItem = new storeModel({
          title,
          description,
          quantity,
          photo: photofilename,
          extra,
        });

        console.log(newItem);
        await newItem.save();
        res.status(201).json({ Alert: `${title} Added to store` });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .put(dataController.updateItems)
  .delete(dataController.deleteItems);

router.route("/search").post(dataController.searchItems);

module.exports = router;
