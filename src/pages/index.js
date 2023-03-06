import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../components/utils/constants.js';

const formPopUpEdit = document.forms.editProfile;
const nameInput = formPopUpEdit.querySelector('.popup__input_type_name');
const specialityInput = formPopUpEdit.querySelector('.popup__input_type_speciality');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');

const renderCard = (data) => {
  const card = new Card({
    data,
    zoomImage: () => {
      popupFigure.open(data);
    }
  }, '.elements-template')
  return card.generateCard();
}

const cardsList  = new Section({
  items: initialCards,
  renderer: item => {
    const cardElement = renderCard(item);
    cardsList.addItem(cardElement);
  }
}, '.elements');
cardsList.renderItems();

const popupFigure = new PopupWithImage('.popup_type_image');
popupFigure.setEventListeners();

const popupFormAddCard = new PopupWithForm('.popup_type_new-card', newCard => {
  const cardData = {
    name: newCard['name-image'],
    link: newCard['link-image']
  }
  const cardElement = renderCard(cardData);
  cardsList.addItem(cardElement);
})
popupFormAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupFormAddCard.open();

})

const popupFormEditProfile = new PopupWithForm('.popup_type_edit', (data) => {
  userInfo.setUserInfo(data.name, data.speciality);
});
popupFormEditProfile.setEventListeners();

const userInfo = new UserInfo({ name: '.profile__title', info: '.profile__subtitle' });
userInfo.getUserInfo();

buttonEdit.addEventListener('click', () => {
  const userProfile = userInfo.getUserInfo();
  nameInput.value = userProfile.name;
  specialityInput.value = userProfile.info;
  popupFormEditProfile.open();
})

const formPopUpEditNew = new FormValidator(validationConfig, formPopUpEdit);
const cardFormNew = new FormValidator(validationConfig, document.forms.newCard);

formPopUpEditNew.enableValidation();
cardFormNew.enableValidation();
cardFormNew.toggleButtonState();
