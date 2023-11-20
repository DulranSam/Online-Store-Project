const bcrypt = require("bcrypt");
const paymentModel = require("../models/payment");

async function getPayments(req, res) {
  res.json({ Alert: "Payment Route" });
}

async function createPayment(req, res) {
  const { card, holder, defaddress, address1, postalcode, phonenumber } =
    req.body;
  if (!card || !holder || !defaddress || !phonenumber || !postalcode) {
    return res.status(400).json({ Alert: "Required fields not filled" });
  } else {
    const encryptCard = bcrypt.hashSync(card, 10);
    const paymentFinal = new paymentModel({
      card: encryptCard,
      holder,
      defaddress,
      address1,
      tempAddress,
      billingAd,
      postalcode,
      phonenumber,
    });

    await paymentFinal.save();
    const temp = uuid();
    return res
      .status(201)
      .json({ Alert: `Thank you , your order ID is ${temp}` });
  }
}

module.exports = { createPayment, getPayments };
