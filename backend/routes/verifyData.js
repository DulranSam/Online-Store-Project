const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
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
  .post(upload.single("photo"), dataController.createItem)
  .put(dataController.updateItems)
  .delete(dataController.deleteItems);

router.route("/search").post(dataController.searchItems);

module.exports = router;
