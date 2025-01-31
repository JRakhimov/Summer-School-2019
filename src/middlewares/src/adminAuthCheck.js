require('dotenv').config();
const jwt = require('jsonwebtoken');
const ExpressLogger = require('debug')('Express:AdminAuthCheck');

module.exports = (req, res, next) => {
  const TOKEN = req.header('X-Auth');

  jwt.verify(TOKEN, process.env.SALT, (err, decoded) => {
    if (err) return res.status(401).json({ status: false, message: 'Access denied -> pwnx.js:22:06' });

    decoded.left = `${~~((decoded.exp - Date.now() / 1000) / 3600)}h`;

    ExpressLogger(decoded);

    return next();
  });
};
