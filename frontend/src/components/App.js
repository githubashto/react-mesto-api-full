import React from 'react';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isAuthSuccessful, setAuthSuccessful] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const history = useHistory();


  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    setIsLoading(true);

    api.getUserInfo()
      .then(result => {
        setCurrentUser(result);
      })
      .catch(err => console.log(`Ошибка при получении профиля ${err}`));

    api.getInitialCards()
      .then(setCards)
      .finally(() => setIsLoading(false))
      .catch(err => console.log(`Ошибка при получении карточек ${err}`));

    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn])


  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then(result => {
        setCurrentUser(result);
      })
      .then(closeAllPopups)
      .catch(err => console.log(`Ошибка при обновлении профиля ${err}`));
  }

  function handleUpdateAvatar(data) {
    api.patchUserAvatar(data)
      .then(result => {
        setCurrentUser(result);
      })
      .then(closeAllPopups)
      .catch(err => console.log(`Ошибка при обновлении профиля ${err}`));
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch(err => console.log(`Ошибка при добавлении карточки ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card.id, isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card.id ? newCard : c);
        setCards(newCards);
     })
      .catch(err => console.log(`Ошибка при обновлении карточки ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card.id);
        setCards(newCards);
     })
      .catch(err => console.log(`Ошибка при удалении карточки ${err}`))
  }

  function handleRegister(data) {
    return auth.register(data)
      .then(result => {
        setAuthSuccessful(true);
        setInfoTooltipOpen(true);
        history.push('/sign-in');
        return;
      })

      .catch(err => {
        console.log(`Ошибка при регистрации ${err}`);
        setAuthSuccessful(false);
        setInfoTooltipOpen(true);
      });
  }

  function handleLogin(data) {
    return auth.authorize(data)
      .then(result => {
        localStorage.setItem('jwt', result.token);
        auth.getContent(result.token)
          .then(result => {
            setLoggedIn(true);
            setEmail(result.email)
          })
      })
      .finally(history.push('/'))

      .catch(err => {
        console.log(`Ошибка при авторизации ${err}`);
        setAuthSuccessful(false);
        setInfoTooltipOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(result => {
          setLoggedIn(true);
          setEmail(result.data.email);
        })
        .catch(err => console.log(err));
    }
  }

  return (
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoading={isLoading}
              email = {email}
              onSignOut={handleSignOut}
            />

            <Route>
              {loggedIn
              ? (
                <Redirect to="/" />
              )
              : (
              <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltipOpen} isSuccessful={isAuthSuccessful}/>

        </CurrentUserContext.Provider>

        <Footer />
      </div>
  );
}

export default App;
