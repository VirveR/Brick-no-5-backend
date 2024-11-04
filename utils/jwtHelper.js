const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET;
const generateToken = (user) => {
  return jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {expiresIn: '5h'});
};
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {generateToken, verifyToken};