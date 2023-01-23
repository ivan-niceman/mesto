const popUp = document.querySelectorAll('.popup');
const popUpInput = document.querySelectorAll('.popup__input');
const popUpInputError = document.querySelectorAll('.popup__input-error');
const buttonEdit = document.querySelector('.profile__button-edit');
const typeEditPopUp = document.querySelector('.popup_type_edit');
const buttonPopUpCloseEdit = typeEditPopUp.querySelector('.popup__button-close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formPopUpEdit = typeEditPopUp.querySelector('.popup__form');
const nameInput = typeEditPopUp.querySelector('.popup__input_type_name');
const specialityInput = typeEditPopUp.querySelector('.popup__input_type_speciality');
const buttonCreateForm = document.querySelector('.popup__button-create');

// функция возврата значений формы редактирования профиля //

function returnInput() {
  nameInput.value = profileTitle.textContent;
  specialityInput.value = profileSubtitle.textContent;
}

// функция открытия popup редактирования профиля //

function openPopUp(popup) {
  popup.classList.add('popup_opened');
  closePopUpKeyEsc(popup);
}

// функция закрытия popup кнопкой esc //

function closePopUpKeyEsc(popup){
  document.addEventListener('keydown', elem => {
    if (elem.key === 'Escape') {
      closePopUp(popup);
      cardForm.reset();
    }
  });
}

// функция закрытия popup //

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  popUpInput.forEach(elem => {
    elem.classList.remove('popup__input_type_error');
  })
  popUpInputError.forEach(error => {
    error.textContent = '';
  })
  buttonCreateForm.classList.add('popup__button-inactive');
}

buttonPopUpCloseEdit.addEventListener('click', () => {
  closePopUp(typeEditPopUp);
})

buttonEdit.addEventListener('click', () => {
  openPopUp(typeEditPopUp);
  returnInput();
})

// функция закрытия popup по клику за пределами окна //

function closePopUpOutside() {
  popUp.forEach(elem => {
    elem.addEventListener('click', element => {
      if(element.target === element.currentTarget) {
        closePopUp(elem);
        cardForm.reset();
      }
    })
  })
}

closePopUpOutside();

// функция отправки формы редактирования профиля //

function submitFormEdit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  typeEditPopUp.classList.remove('popup_opened');
}
formPopUpEdit.addEventListener('submit', submitFormEdit);

// добавление карточек //

const elements = document.querySelector('.elements');
const elementsTemplate = document
  .querySelector('.elements-template')
  .content
  .querySelector('.element');

const cardForm = document.querySelector('.popup__form-card');
const cardInput = document.querySelector('.popup__input_type_name-card');
const cardLink = document.querySelector('.popup__input_type_link');

const figurePopUpImage = document.querySelector('.popup__image-figure');
const namePopUpImage = document.querySelector('.popup__image-name');
const popUpImage = document.querySelector('.popup_type_image');
const buttonCloseImage = popUpImage.querySelector('.popup__button-close-image');

// функция увеличения карточки //

function zoomImage(image) {
  image.addEventListener('click', () => {
    figurePopUpImage.src = image.src;
    figurePopUpImage.alt = image.alt;
    namePopUpImage.textContent = image.alt;

    openPopUp(popUpImage);
  })
}
buttonCloseImage.addEventListener('click', () => {
  closePopUp(popUpImage);
})

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
const buttonPopUpCloseCard = typeNewCard.querySelector('.popup__button-close-card');

// открыть typeNewCard //

buttonAddCard.addEventListener('click', () => {
  openPopUp(typeNewCard);
})

// закрыть typeNewCard //

buttonPopUpCloseCard.addEventListener('click', () => {
  closePopUp(typeNewCard);
  cardForm.reset();
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
