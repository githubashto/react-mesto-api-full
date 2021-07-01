const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri({
      scheme: /https?/,
    }).required(),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при создании карточки.',
    'string.min': 'Переданы некорректные данные при создании карточки.',
    'string.max': 'Переданы некорректные данные при создании карточки.',
    'any.required': 'Переданы некорректные данные при создании карточки.',
    'string.uri': 'Переданы некорректные данные при создании карточки.',
    'string.uriCustomScheme': 'Переданы некорректные данные при создании карточки.',
  },
}), createCard);
router.delete('/:cardId', deleteCard);
router.put('/likes/:cardId', likeCard);
router.delete('/likes/cardId', unlikeCard);

module.exports = router;
