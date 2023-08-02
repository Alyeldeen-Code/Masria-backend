const jwt = require("jsonwebtoken");
const config = require("config");
const permissionParser = require("../utils/permissionParser");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No Token Provided.");
  try {
    const decodedToken = jwt.verify(token, config.get("jwtPraivetKey"));
    req.user = decodedToken;

    const Roles = permissionParser(decodedToken.Roles);
    req.Roles = Roles;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
}

module.exports = auth;
