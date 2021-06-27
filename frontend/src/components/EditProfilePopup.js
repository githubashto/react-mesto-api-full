import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const {isOpen, onClose, onUpdateUser} = props;

  const currentUser = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setUserName(`${currentUser.name}`);
    setDescription(`${currentUser.about}`);
  }, [currentUser]);

  function handleNameInput(e) {
    setUserName(e.target.value);
  }

  function handleDescriptionInput(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input type="text" name="name" id="form-name" minLength="2" maxLength="40" className="popup__input popup__input_content_name" placeholder="Имя" value={userName} onChange={handleNameInput} required />
      <span id = "form-name-error" className="popup__error"></span>
      <input type="text" name="profession" id="form-profession" minLength="2" maxLength="200" className="popup__input popup__input_content_profession" placeholder="Занятие" value={description} onChange={handleDescriptionInput} required />
      <span id = "form-profession-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
