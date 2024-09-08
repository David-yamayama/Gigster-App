const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY; // La clé secrète est récupérée depuis les variables d'environnement

module.exports = (req, res, next) => {
  // Essaie de récupérer le token depuis les headers ou le corps de la requête
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

    // Le token est valide, on passe les infos décodées à la requête
    req.auth = { username: decoded.username };
    next(); // Passe à la prochaine étape (la route)
  });
};
