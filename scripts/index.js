import Card from './Card.js';
import FormValidator from './FormValidator.js';

const formPopUpEdit = document.forms.editProfile;
const popUps = document.querySelectorAll('.popup');
const typeEditPopUp = document.querySelector('.popup_type_edit');
// const popUpInputs = formPopUpEdit.querySelectorAll('.popup__input');
// const profileInputErrors = formPopUpEdit.querySelectorAll('.popup__input-error');
const nameInput = formPopUpEdit.querySelector('.popup__input_type_name');
const specialityInput = formPopUpEdit.querySelector('.popup__input_type_speciality');

const cardForm = document.forms.newCard;
const elements = document.querySelector('.elements');
const cardInput = cardForm.querySelector('.popup__input_type_name-card');
const cardLink = cardForm.querySelector('.popup__input_type_link');
const figurePopUpImage = document.querySelector('.popup__image-figure');
const namePopUpImage = document.querySelector('.popup__image-name');
const popUpImage = document.querySelector('.popup_type_image');
const typeNewCard = document.querySelector('.popup_type_new-card');

const buttonEdit = document.querySelector('.profile__button-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonAddCard = document.querySelector('.profile__button-add');

const forms = document.querySelectorAll('form');
// const forms = document.querySelector('form');

// forms.addEventListener('submit', evt => {
//   evt.preventDefault();
// })

forms.forEach(form => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
  })
})

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

// функция заполнения полей профиля //

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  specialityInput.value = profileSubtitle.textContent;
}

// функция открытия popup редактирования профиля //

function openPopUp(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpKeyEsc);
}

// функция сброса ошибок //

// function resetErrors() {
//   profileInputErrors.forEach(error => {
//     error.textContent = '';
//   })
//   popUpInputs.forEach(elem => {
//     elem.classList.remove('popup__input_type_error');
//   })
// }

// функция закрытия popup //

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpKeyEsc);
}

// функция закрытия popup кнопкой esc //

function closePopUpKeyEsc(evt){
  if (evt.key === 'Escape') {
    const opendPopUp = document.querySelector('.popup_opened');
    closePopUp(opendPopUp);
  }
}

popUps.forEach( popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) {
      closePopUp(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopUp(popup);
    }
  })
})

buttonAddCard.addEventListener('click', () => {
  openPopUp(typeNewCard);
})

buttonEdit.addEventListener('click', () => {
  openPopUp(typeEditPopUp);
  fillProfileInputs();
})

// функция отправки формы редактирования профиля //

function submitFormEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  closePopUp(typeEditPopUp);
}
formPopUpEdit.addEventListener('submit', submitFormEdit);

function createCard(item) {
  const cardElement = new Card(item, '.elements-template', zoomImage).generateCard();
  return cardElement;
}

// функция отправки формы добавления карточки //

function handleCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardInput.value,
    link: cardLink.value,
  }
  const cardElement = createCard(newCard);
  elements.prepend(cardElement);
  cardForm.reset();
  closePopUp(typeNewCard);
}
cardForm.addEventListener('submit', handleCard);


function addCard(data, container) {
  const cardElement = createCard(data);
  container.prepend(cardElement);
}

function renderCards() {
  initialCards.reverse().forEach(card => {
    addCard(card, elements, zoomImage);
  });
}

function zoomImage(name, link) {
  figurePopUpImage.src = link;
  figurePopUpImage.alt = name;
  namePopUpImage.textContent = name;
  openPopUp(popUpImage);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formPopUpEditNew = new FormValidator(validationConfig, document.forms.editProfile);
const cardFormNew = new FormValidator(validationConfig, document.forms.newCard);

formPopUpEditNew.enableValidation();
cardFormNew.enableValidation();
cardFormNew.toggleButtonState();

renderCards();
