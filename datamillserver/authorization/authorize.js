var jwt = require('jsonwebtoken');
var moment = require('moment');

function isAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var decoded = null;
  try {
    decoded = jwt.decode(token, { complete: true });
    console.log(decoded.payload);
    console.log(decoded.header);
    var userId = decoded.payload.sub;
    console.log(userId);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
  console.log("checking expiry")
  if (decoded.payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = decoded.payload.sub;
  req.email = decoded.payload.email;
  console.log("Authenticated", req.email.req.user);
  next();
}
module.exports = { isAuthenticated: isAuthenticated };
