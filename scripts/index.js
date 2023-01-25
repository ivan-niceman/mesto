const popUps = document.querySelectorAll('.popup');
const typeEditPopUp = document.querySelector('.popup_type_edit');
const formPopUpEdit = document.forms.editProfile;
const popUpInputs = formPopUpEdit.querySelectorAll('.popup__input');
const profileInputErrors = formPopUpEdit.querySelectorAll('.popup__input-error');
const nameInput = formPopUpEdit.querySelector('.popup__input_type_name');
const specialityInput = formPopUpEdit.querySelector('.popup__input_type_speciality');
const buttonEdit = document.querySelector('.profile__button-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

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

function resetErrors() {
  profileInputErrors.forEach(error => {
    error.textContent = '';
  })
  popUpInputs.forEach(elem => {
    elem.classList.remove('popup__input_type_error');
  })
}

// функция закрытия popup //

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpKeyEsc);
}

// обработчик закрытия попапа //

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

// функция закрытия popup кнопкой esc //

function closePopUpKeyEsc(evt){
  if (evt.key === 'Escape') {
    const opendPopUp = document.querySelector('.popup_opened');
    closePopUp(opendPopUp);
  }
}

buttonEdit.addEventListener('click', () => {
  openPopUp(typeEditPopUp);
  fillProfileInputs();
  resetErrors();
})

// функция отправки формы редактирования профиля //

function submitFormEdit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  closePopUp(typeEditPopUp);
}
formPopUpEdit.addEventListener('submit', submitFormEdit);

// добавление карточек //

const elements = document.querySelector('.elements');
const elementsTemplate = document
  .querySelector('.elements-template')
  .content
  .querySelector('.element');

const cardForm = document.forms.newCard;
const cardInput = cardForm.querySelector('.popup__input_type_name-card');
const cardLink = cardForm.querySelector('.popup__input_type_link');

const figurePopUpImage = document.querySelector('.popup__image-figure');
const namePopUpImage = document.querySelector('.popup__image-name');
const popUpImage = document.querySelector('.popup_type_image');

// функция увеличения карточки //

function zoomImage(image) {
  image.addEventListener('click', () => {
    figurePopUpImage.src = image.src;
    figurePopUpImage.alt = image.alt;
    namePopUpImage.textContent = image.alt;

    openPopUp(popUpImage);
  })
}

// клонируем карточки из массива initialCards //

function createCard({link, name}) {
  const elementCard = elementsTemplate.cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementNameImage = elementCard.querySelector('.element__subtitle');
  const buttonDelete = elementCard.querySelector('.element__trash');
  const buttonLikeCard = elementCard.querySelector('.element__like');

  elementImage.src = link;
  elementImage.alt = name;
  elementNameImage.textContent = name;

  // функция удаления карточки //

  function deleteCard() {
    elementCard.remove();
  }
  buttonDelete.addEventListener('click', deleteCard);

  // функция лайка карточки //

  function likeCard() {
    buttonLikeCard.classList.toggle('element__like_active');
  }
  buttonLikeCard.addEventListener('click', likeCard);

  zoomImage(elementImage);

  return elementCard;
}

// функция перебора и добавления карточек //

function renderCards() {
  initialCards.forEach( (card) => {
    const cardHtml = createCard(card);
    elements.append(cardHtml);
  });
}

const buttonAddCard = document.querySelector('.profile__button-add');
const typeNewCard = document.querySelector('.popup_type_new-card');

// открыть typeNewCard //

buttonAddCard.addEventListener('click', () => {
  openPopUp(typeNewCard);
})

// функция добавления карточки //

function submitNewCardForm(event) {
  event.preventDefault();

  const newCard = createCard({
    name: cardInput.value,
    link: cardLink.value
  });
  cardForm.reset();
  elements.prepend(newCard);
  closePopUp(typeNewCard);
}

cardForm.addEventListener('submit', submitNewCardForm);

renderCards();
