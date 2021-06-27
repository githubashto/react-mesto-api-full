const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return handleAuthError(res);
  }

  let payload;

  try {
    payload = jwt.verify(token, '646ddbb71f6dce81b138cef8bcb7635dc8677341ab330829841a86183f2aebed');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
