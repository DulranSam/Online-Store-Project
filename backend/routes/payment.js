const express = require("express");
const router = express.Router();
const paymentModel = require("../controllers/paymentController");
const nodemailer = require("nodemailer");

router
  .route("/")
  .get( async (req, res) => {
    
  })
  .post( async (req, res) => {
    const { card, holder, defaddress, address1, postalcode, phonenumber } =
      req.body;
    if (!card || !holder || !defaddress || !phonenumber || !postalcode) {
      return res.status(400).json({ Alert: "Required fields not filled" });
    } else {
      const paymentFinal = new paymentModel({
        card,
        holder,
        defaddress,
        address1,
        postalcode,
        phonenumber,
      });

      await paymentFinal.save();
      const temp = uuid();
      return res.status(201).json({Alert:`Thank you , your order ID is ${temp}`});
      
    }
  });

module.exports = router;
