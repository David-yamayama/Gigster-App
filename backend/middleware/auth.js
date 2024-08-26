const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        const username = decodedToken.username;
        req.auth = {
            username: username
        };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
