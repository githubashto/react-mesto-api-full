require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ValidationError = require('../errors/valid-err');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .select('name about avatar')
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .select('name about avatar')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Некорректный _id.');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .select('name about avatar')
    .then((user) => {
      if (!user) {
        throw new AuthError('Необходима авторизация.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Некорректный _id.');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании пользователя.');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError('Вы уже регистрировались.');
      } else {
        throw err;
      }
    })
    .catch(next);
};

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : '646ddbb71f6dce81b138cef8bcb7635dc8677341ab330829841a86183f2aebed',
        { expiresIn: '7d' });
      res.send({ token, data: user })
        .end();
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new ValidationError('Переданы некорректные данные при обновлении пользователя.');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .select('name about avatar')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при обновлении пользователя.');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Некорректный _id.');
      } else {
        throw err;
      }
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new ValidationError('Переданы некорректные данные при обновлении аватара.');
  }

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .select('name about avatar')
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при обновлении аватара.');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new ValidationError('Некорректный _id.');
      } else {
        throw err;
      }
    })
    .catch(next);
};
