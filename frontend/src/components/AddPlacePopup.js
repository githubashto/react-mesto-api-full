import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const {isOpen, onClose, onAddPlace} = props;

  const [placeName, setPlaceName] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleNameInput(e) {
    setPlaceName(e.target.value);
  }

  function handleUrlInput(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: url,
    });
    setPlaceName('');
    setUrl('');
  }

  return (
    <PopupWithForm name="place" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Создать">
      <input type="text" name="placename" id="form-placename" minLength="2" maxLength="30" placeholder="Название" value={placeName} onChange={handleNameInput}  className="popup__input popup__input_content_placename" required />
      <span id = "form-placename-error" className="popup__error"></span>
      <input type="url" name="url" id="form-url" placeholder="Ссылка на картинку" value={url} onChange={handleUrlInput} className="popup__input popup__input_content_url" required />
      <span id = "form-url-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
