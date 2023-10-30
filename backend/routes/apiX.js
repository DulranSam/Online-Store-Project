const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const apiHandler = require("../controllers/apiHandler");

/*
const limitSearch = rateLimit({
  windowMs: 1000*60*24,
  limit: 99,
});


router
  .route("/")
  .post(limitSearch,apiHandler.conversion);
*/


router.route("/translate").post(apiHandler.translator).get(apiHandler.getLangs)

module.exports = router;
