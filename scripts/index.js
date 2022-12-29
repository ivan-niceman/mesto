const buttonEdit = document.querySelector('.profile__button-edit');
const typeEditPopUp = document.querySelector('.popup_type_edit');
const buttonPopUpCloseEdit = typeEditPopUp.querySelector('.popup__button-close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formPopUpEdit = typeEditPopUp.querySelector('.popup__form');
const nameInput = typeEditPopUp.querySelector('.popup__input_type_name');
const specialityInput = typeEditPopUp.querySelector('.popup__input_type_speciality');

// функция возврата значений формы редактирования профиля //

function returnInput() {
  nameInput.value = profileTitle.textContent;
  specialityInput.value = profileSubtitle.textContent;
}

// функция открытия popup редактирования профиля //

function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия popup редактирования профиля //

function closePopUpButton(popup) {
  popup.classList.remove('popup_opened');
}

buttonPopUpCloseEdit.addEventListener('click', () =>{
  closePopUpButton(typeEditPopUp);
})

buttonEdit.addEventListener('click', function(){
  openPopUp(typeEditPopUp);
  returnInput();
})

// функция отправки формы редактирования профиля //

function submitFormEdit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  typeEditPopUp.classList.remove('popup_opened');
}
formPopUpEdit.addEventListener('submit', submitFormEdit);

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
buttonCloseImage.addEventListener('click', () =>{
  closePopUpButton(popUpImage);
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
  initialCards.forEach(card => {
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

buttonPopUpCloseCard.addEventListener('click', () =>{
  closePopUpButton(typeNewCard);
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
  closePopUpButton(typeNewCard);
}

cardForm.addEventListener('submit', submitNewCardForm);

renderCards();

// function buttonPopUpCloseOutside() {
//   popUp.addEventListener('click', function(element){
//     if(element.target == element.currentTarget) {
//       popUp.classList.remove('popup_opened');
//       returnInput();
//     }
//   })
// }
// buttonPopUpCloseOutside();
