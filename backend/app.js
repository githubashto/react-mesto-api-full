const path = require('path');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { isCelebrateError } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();
const {
  createUser, login,
} = require('./controllers/users');

const corsOptions = {
  origin: ['http://localhost:3001', 'http://nutag.nomoredomains.club', 'https://nutag.nomoredomains.club'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(cors(corsOptions));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({
      scheme: /https?/,
    }),
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при создании пользователя.',
    'string.min': 'Переданы некорректные данные при создании пользователя.',
    'string.max': 'Переданы некорректные данные при создании пользователя.',
    'any.required': 'Переданы некорректные данные при создании пользователя.',
    'string.email': 'Переданы некорректные данные при создании пользователя.',
    'string.uri': 'Переданы некорректные данные при создании пользователя.',
    'string.uriCustomScheme': 'Переданы некорректные данные при создании пользователя.',
  },
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required(),
  }),
},
{
  messages: {
    'string.empty': 'Переданы некорректные данные при создании пользователя.',
    'any.required': 'Переданы некорректные данные при создании пользователя.',
    'string.email': 'Переданы некорректные данные при создании пользователя.',
  },
}), login);

app.use(cookieParser());
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Такой страницы нет.');
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    statusCode = 400;
    const errorBody = err.details.get('body');
    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
  }
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('It works');
});
