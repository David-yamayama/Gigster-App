const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

module.exports = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : req.body.token;

  if (!token) {
    return res.status(401).json({ result: false, error: "Missing token" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ result: false, error: "Invalid token" });
    }

    req.auth = { username: decoded.username };
    next();
  });
};
