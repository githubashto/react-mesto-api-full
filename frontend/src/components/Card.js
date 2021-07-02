import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const {name, link, likes, onCardClick, onCardLike, onCardDelete, owner, _id: id} = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
  );
  const isLiked = likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    onCardClick({name, link});
  }

  function handleLikeClick() {
    onCardLike({isLiked, id});
  }

  function handleDeleteClick() {
    onCardDelete({id});
  }

  return (
    <article className="element">
      <div className="element__picture">
        <img src={link} alt={name} className="element__image" onClick={handleClick} />
          <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      </div>
    <div className="element__caption">
      <h3 className="element__title">{name}</h3>
      <div className="element__likes">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <p className="element__likes-number">{likes.length !== 0 && likes.length}</p>
      </div>
    </div>
    </article>
  );
}

export default Card;
