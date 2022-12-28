const editButton = document.querySelector('.profile__button-edit');
const popUp = document.querySelector('.popup');
const popUpClose = popUp.querySelector('.popup__button-close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popUpForm = popUp.querySelector('.popup__form');
const popUpInput = popUp.querySelector('.popup__input');
const nameInput = popUp.querySelector('.popup__input_type_name');
const specialityInput = popUp.querySelector('.popup__input_type_speciality');

function inputReturn() {
  nameInput.value = profileTitle.textContent;
  specialityInput.value = profileSubtitle.textContent;
}

function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function buttonClosePopUp(popup) {
  popup.classList.remove('popup_opened');
}

popUpClose.addEventListener('click', () =>{
  buttonClosePopUp(popUp);
})

editButton.addEventListener('click', function(){
  openPopUp(popUp);
  inputReturn();
})

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  popUp.classList.remove('popup_opened');
}
popUpForm.addEventListener('submit', handleFormSubmit);

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

const elements = document.querySelector('.elements');
const elementsTemplate = document
  .querySelector('.elements-template')
  .content
  .querySelector('.element');

const formCard = document.querySelector('.popup__form-card');
const inputCard = document.querySelector('.popup__input_type_name-card');
const linkCard = document.querySelector('.popup__input_type_link');

// клонируем карточки из массива initialCards //

function createCard({link, name}) {
  const elementCard = elementsTemplate.cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementNameImage = elementCard.querySelector('.element__subtitle');

  const popUpImage = document.querySelector('.popup_type_image');
  const closeImage = popUpImage.querySelector('.popup__button-close-image');

  elementImage.src = link;
  elementImage.alt = name;
  elementNameImage.textContent = name;

  // функция удаления карточки //

  function deleteCard() {
    elementCard.remove();
  }

  const deleteButton = elementCard.querySelector('.element__trash');
  deleteButton.addEventListener('click', deleteCard);

  // функция лайка карточки //

  function likeCard() {
    likeCardButton.classList.toggle('element__like_active');
  }
  const likeCardButton = elementCard.querySelector('.element__like');
  likeCardButton.addEventListener('click', likeCard);

  // функция увеличения карточки //

  function zoomImage(image) {
    image.addEventListener('click', () => {
      const popUpImageFigure = document.querySelector('.popup__image-figure');
      const popUpImageName = document.querySelector('.popup__image-name');

      popUpImageFigure.src = image.src;
      popUpImageFigure.alt = image.alt;
      popUpImageName.textContent = image.alt;

      openPopUp(popUpImage);
    })
  }
  zoomImage(elementImage);

  closeImage.addEventListener('click', () =>{
    buttonClosePopUp(popUpImage);
  })

  return elementCard;
}

// функция перебора и добавления карточек //

function renderCards() {
  initialCards.forEach(card => {
    const cardHtml = createCard(card);
    elements.append(cardHtml);
  });
}

const addCardButton = document.querySelector('.profile__button-add');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const popUpCloseCard = popUpAddCard.querySelector('.popup__button-close-card');

// открыть popUpAddCard //

addCardButton.addEventListener('click', () => {
  openPopUp(popUpAddCard);
})

// функция очистки input при закрытии popUp //

function clearInput() {
  inputCard.value = '';
  linkCard.value = '';
}

// закрыть popUpAddCard //

popUpCloseCard.addEventListener('click', () =>{
  buttonClosePopUp(popUpAddCard);
  clearInput();
})

// функция добавления карточки //

function submitForm(event) {
  event.preventDefault();

  const newCard = createCard({
    name: inputCard.value,
    link: linkCard.value
  });
  clearInput();
  elements.prepend(newCard);
  buttonClosePopUp(popUpAddCard);
}

formCard.addEventListener('submit', submitForm);

renderCards();

// function popUpCloseOutside() {
//   popUp.addEventListener('click', function(element){
//     if(element.target == element.currentTarget) {
//       popUp.classList.remove('popup_opened');
//       inputReturn();
//     }
//   })
// }
// popUpCloseOutside();
