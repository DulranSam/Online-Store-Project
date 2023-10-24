
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ats = process.env.ACCESS_TOKEN;

async function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ Alert: "No Auth Header" });
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, ats, (err, decoded) => {
      if (err) return res.status(403);
      req.user = decoded.username;
      next();
    });
  }
}

module.exports = { verifyJWT };
