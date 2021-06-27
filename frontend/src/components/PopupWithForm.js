import React from 'react';

function PopupWithForm(props) {
  const {name, title, isOpen, onClose, onSubmit, buttonText, children} = props;
  return (
  <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
    <div className={`popup__container popup__container_content_${name}`}>
      <button type="button" className={`popup__close popup__close_content_${name}`} onClick={onClose}></button>
      <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className={`popup__submit popup__submit_content_${name}`}>{buttonText}</button>
      </form>
    </div>
  </section>
  );
}

export default PopupWithForm;
