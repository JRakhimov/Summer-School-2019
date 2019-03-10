require('dotenv').config();
const jwt = require('jsonwebtoken');
const ExpressLogger = require('debug')('Express:TeacherAuthCheck');

module.exports = (req, res, next) => {
  const TOKEN = req.header('X-Auth');

  jwt.verify(TOKEN, process.env.SALT, (err, decoded) => {
    if (err) return res.status(401).json({ status: false, message: 'Access denied -> pwnx.js:22:06' });

    ExpressLogger(decoded);

    return next();
  });
};
