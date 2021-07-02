const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, getMe, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', celebrate({
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
