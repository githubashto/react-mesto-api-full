const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:3000', 'http://192.168.1.5:3001', 'http://127.0.0.1:3001', 'http://127.0.0.1:3000'],
  optionsSuccessStatus: 200,
  preflightContinue: true,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const {
  getUsers, getUser, getMe, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', cors(corsOptions), getUsers);
router.get('/me', getMe);
router.get('/:userId', cors(corsOptions), getUser);
router.patch('/me', cors(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при обновлении пользователя.',
    'string.min': 'Переданы некорректные данные при обновлении пользователя.',
    'string.max': 'Переданы некорректные данные при обновлении пользователя.',
  },
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({
      scheme: /https?/,
    }),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при обновлении аватара.',
    'string.uri': 'Переданы некорректные данные при обновлении аватара.',
    'string.uriCustomScheme': 'Переданы некорректные данные при обновлении аватара.',
  },
}), updateUserAvatar);

module.exports = router;
