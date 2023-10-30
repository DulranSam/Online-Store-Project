const express = require("express");
const router = express.Router();
const paymentModel = require("../controllers/paymentController");

router
  .route("/")
  .get(paymentModel.getPayments)
  .post(paymentModel.createPayment);

module.exports = router;
