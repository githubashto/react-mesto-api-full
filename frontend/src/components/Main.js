import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Header from './Header.js';

function Main(props) {

  const {onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick,
        cards,
        onCardLike,
        onCardDelete,
        isLoading,
        onSignOut
      } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (<>
    <Header>
      <p>
        <span className="header__email">{currentUser.email}</span>
        <button onClick={onSignOut} className="header__sign-out">Выйти</button>
      </p>
    </Header>

    <main className="block">
      <section className="profile">
        <div className="profile__portrait">
          <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar" />
          <div className="profile__portrait-overlay">
            <button type="button" className="profile__edit-avatar" onClick={onEditAvatar}></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      {isLoading
        ? <p className="footer__text">Немного подождите, пока загрузятся данные...</p>
        : (<section className="elements">
            {cards.map(item => (
              <Card key={item._id} {...item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            )
            )}
          </section>)
        }
      </main>
  </>);
}

export default Main;
