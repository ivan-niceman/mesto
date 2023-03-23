import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig } from '../utils/constants.js';
import Api from '../components/Api.js';

const formPopUpEdit = document.forms.editProfile;
const formPopUpCard = document.forms.newCard;
const formPopUpEditAvatar = document.forms.changeAvatar;

const nameInput = formPopUpEdit.querySelector('.popup__input_type_name');
const specialityInput = formPopUpEdit.querySelector('.popup__input_type_speciality');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');

const validationProfileForm = new FormValidator(validationConfig, formPopUpEdit);
const validationCardForm = new FormValidator(validationConfig, formPopUpCard);
const validationAvatarForm = new FormValidator(validationConfig, formPopUpEditAvatar);

validationProfileForm.enableValidation();
validationCardForm.enableValidation();
validationCardForm.toggleButtonState();
validationAvatarForm.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');
const formProfile = new PopupWithForm('.popup_type_edit', myProfile);
const formAvatar = new PopupWithForm('.popup_type_change-avatar', myAvatar);
const cardDelete = new PopupWithConfirmation('.popup_type_delete-card');

let userId;

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-61',
  '666d34ff-30b6-4309-9a25-485bb128c35e'
  );

Promise.all([api.getCards(), api.getCurrentUser()])
  .then(([cards, user]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

  const userInfo = new UserInfo({
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar'
  });

const cardList  = new Section({
  renderer: item => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements');

function zoomImage(name, link) {
  popupWithImage.open(name, link);
}

function createCard(item) {
  const card = new Card(
    item,
    userId,
    '.elements-template',
    zoomImage,
    id => {
      cardDelete.open();
      cardDelete.changeSubmitHandler(() => {
        cardDelete.renderLoadingDelete(true);
        api
        .deleteCard(id)
        .then(() => {
          card.deleteCard();
          cardDelete.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          cardDelete.renderLoadingDelete(false);
        });
      })
    },
    likeMyCard,
    deletelikeMyCard
  )
  return card.generateCard();
}

function likeMyCard(id, cardElement) {
  api
    .putLike(id)
    .then((res) => {
      cardElement.toggleLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function deletelikeMyCard(id, cardElement) {
  api
    .deleteLike(id)
    .then((res) => {
      cardElement.toggleLike(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function myProfile(data) {
  formProfile.renderLoadingSave(true);
  api
    .createNewProfile(data)
    .then((item) => {
      userInfo.setUserInfo(item);
      // formProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formProfile.renderLoadingSave(false);
    });
}

function myAvatar(data) {
  formAvatar.renderLoadingSave(true);
  api
    .createNewAvatar(data)
    .then((item) => {
      userInfo.setUserInfo(item);
      formAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAvatar.renderLoadingSave(false);
    });
}


const popupFormAddCard = new PopupWithForm('.popup_type_new-card', data => {
  popupFormAddCard.renderLoadingSave(true);
  api
  .createNewCard(data)
  .then( newCard => {
    cardList.addItem(createCard(newCard));
    popupFormAddCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupFormAddCard.renderLoadingSave(false);
  });
})

popupWithImage.setEventListeners();
formProfile.setEventListeners();
formAvatar.setEventListeners();
cardDelete.setEventListeners();
popupFormAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupFormAddCard.open();
})

buttonEdit.addEventListener('click', (evt) => {
  evt.preventDefault;
  const userProfile = userInfo.getUserInfo();
  nameInput.value = userProfile.name;
  specialityInput.value = userProfile.info;
  formProfile.open();
})

buttonEditAvatar.addEventListener('click', () => {
  formAvatar.open();
})