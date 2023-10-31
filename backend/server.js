const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const apiX = require("./routes/apiX");
const userActions = require("./routes/userActions");
const verifyData = require("./routes/verifyData");
const { Log } = require("./middleware/logEvents");
const payment = require("./routes/payment");



app.use(express.json());
app.use(
  cors({
    origin:"http://192.168.1.13:3000" || "http://localhost:3000",
  }) //for react proj
);
app.use(bodyParser.urlencoded({ extended: true }));

if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
app.use(express.static(path.join(__dirname, "public")));

app.use(Log);






app.use("/register", userActions);
app.use("/pay",payment);
app.use("/verify", verifyData);
app.use("/api", apiX);

app.use("*", async (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ Error: "Given directory not found" });
  } else {
    res.type("txt").send("path not found");
  }
});

async function start() {
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true },
    console.log(`Connected to Deranged`)
  );

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();
