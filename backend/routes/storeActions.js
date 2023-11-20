const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const storeModel = require("../models/store");

router.route("/").get(dataController.getItems).delete()


module.exports = router;