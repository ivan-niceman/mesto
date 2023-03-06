import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formPopUpEdit = document.forms.editProfile;
const nameInput = formPopUpEdit.querySelector('.popup__input_type_name');
const specialityInput = formPopUpEdit.querySelector('.popup__input_type_speciality');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');

const initialCards = [
  {
    name: 'Flamingo',
    link: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80'
  },
  {
    name: 'Palms',
    link: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Keonjhar, India',
    link: 'https://images.unsplash.com/photo-1535262412227-85541e910204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Sunglasses',
    link: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Cuba',
    link: 'https://images.unsplash.com/photo-1529426301869-82f4d98d3d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
  },
  {
    name: 'Cancun',
    link: 'https://images.unsplash.com/flagged/photo-1557533046-154fc97b729f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const cardsList  = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card({
      data: item,
      zoomImage: () => {
        popupFigure.open(item)
      }
    }, '.elements-template')
    const cardElement = card.generateCard();
    cardsList .addItem(cardElement);
  }
}, '.elements');
cardsList .renderer();

const popupFigure = new PopupWithImage('.popup_type_image');
popupFigure.setEventListeners();

const popupFormAddCard = new PopupWithForm('.popup_type_new-card', newCard => {
  const card = new Card({
    data: {
      name: newCard['name-image'],
      link: newCard['link-image']
    },
    zoomImage: () => {
      popupFigure.open({
        name: card._name,
        link: card._link
      });
    }
  }, '.elements-template')
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
})
popupFormAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupFormAddCard.open();

})

const popupFormEditProfile = new PopupWithForm('.popup_type_edit', () => {
  userInfo.setUserInfo(nameInput, specialityInput);
})
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
