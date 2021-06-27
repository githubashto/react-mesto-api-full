// секция карточек
export const cardsContainer = '.elements';
export const cardSelector = '.template';
export const cardSelectorInitial = '.template-initial';
export const cardElementSelector = '.element';

// попапы и формы
export const popupProfileSelector = '.popup_type_profile';
export const popupPlaceSelector = '.popup_type_place';
export const popupAvatarSelector = '.popup_type_avatar';
export const popupImageSelector = '.popup_type_image';
export const popupConfirmSelector = '.popup_type_confirm';
export const formEditProfile = document.querySelector('.popup__container_content_profile');
export const formAddPlace = document.querySelector('.popup__container_content_place');
export const formEditAvatar = document.querySelector('.popup__container_content_avatar');

// кнопки открытия попапов с формами
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddPlace = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');

// поля карточки и формы
export const nameInput = document.querySelector('.popup__input_content_name');
export const jobInput = document.querySelector('.popup__input_content_profession');
export const profileNameSelector = '.profile__name';
export const profileProfessionSelector = '.profile__profession';
export const profileAvatarSelector = '.profile__avatar';

// настройки валидации (формы, кнопки, поля и ошибки)
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// элементы карточки
export const cardTitleSelector = '.element__title';
export const cardImageSelector = '.element__image';
export const cardLikesSelector = '.element__likes-number';
export const deleteButtonSelector = '.element__delete';
export const likeButtonSelector = '.element__like';
export const activeLikeClass = 'element__like_active';

