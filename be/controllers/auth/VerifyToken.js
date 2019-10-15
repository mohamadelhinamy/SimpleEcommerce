const jwt = require('jsonwebtoken');
const config = require('../../config');

function verifyToken(req, res, next) {
  console.log('In ver');
  if (process.env.NODE_ENV === 'noAuth') {
    req.userType = 0;
    next();
  } else {
    let token = req.headers.token || req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.userId = decoded.userId;
      req.userType = decoded.userType;
      next();
    });
  }
}

module.exports = verifyToken;
