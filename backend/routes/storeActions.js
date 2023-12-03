const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const storeModel = require("../models/store");

router.route("/").get(dataController.getItems).delete(dataController.deleteItems).post(dataController.createItem).put(dataController.updateItems); //I created the routes previously , somehow they got deleted? 



module.exports = router;
