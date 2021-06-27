import React from 'react';

function ImagePopup(props) {
  const {card, onClose} = props;
  return (
    <>
    ${card === null
    ? null
    : (
      <section className="popup popup_type_image popup_opened">
        <figure className="popup__container popup__container_content_preview">
          <button type="button" className="popup__close popup__close_content_preview" onClick={onClose}></button>
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </section>
      )
    }
   </>
  );
}

export default ImagePopup;
