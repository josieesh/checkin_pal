const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const secret = process.env.SECRET;

const withAuth = function(req, res, next) {
  if (!req.cookies) {
    res.redirect('/login');
  }
  else {
    const token = req.cookies.token;
    if (!token) {
      //res.status(401).send('Unauthorized: No token provided');
      res.status(401).redirect('/login'); 
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
          req.username = decoded.username;
          next();
        }
      });
    }
  }  
}

const checkSession = function(req, res, next) {
  if(!req.session.key) {
    res.status(403).send();  
  }
  next()
}
module.exports = { withAuth, checkSession };