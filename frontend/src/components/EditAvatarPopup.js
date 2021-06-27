import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const {isOpen, onClose, onUpdateAvatar} = props;

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    inputRef.current.value = '';
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input type="url" name="avatar" id="form-avatar" placeholder="Ссылка на картинку" defaultValue="" className="popup__input popup__input_content_avatar" ref={inputRef} required />
      <span id = "form-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
