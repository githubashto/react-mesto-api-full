import React from 'react';

function InfoTooltip(props) {
  const {isOpen, onClose, isSuccessful} = props;
  return (
    <>
     <section className={`popup ${isOpen && "popup_opened"}`}>
        <figure className="popup__container">
          <button type="button" className="popup__close" onClick={onClose}></button>
          <div className={`popup__icon popup__icon_type_${isSuccessful ? `success` : `error`}`} />
          <p className="popup__message">{isSuccessful ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</p>
        </figure>
      </section>
    </>
  );
}

export default InfoTooltip;
