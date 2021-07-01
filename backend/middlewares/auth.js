require('dotenv').config();
const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.replace(/^Bearer\s+/, '');
  console.log(token);
  if (!token) {
    return handleAuthError(res);
  }

  let payload;

  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : '646ddbb71f6dce81b138cef8bcb7635dc8677341ab330829841a86183f2aebed');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
