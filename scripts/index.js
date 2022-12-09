const editButton = document.querySelector('.profile__button-edit');
const popUp = document.querySelector('.popup');
const popUpClose = document.querySelector('.popup__button-close');


editButton.addEventListener('click', function(){
  popUp.classList.add('popup_opened');
})
popUpClose.addEventListener('click', function(){
  popUp.classList.remove('popup_opened');
})
popUp.addEventListener('click', function(element){
  if(element.target == element.currentTarget) {
    popUp.classList.remove('popup_opened');
  }
})

const popUpForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__name');
const specialityInput = document.querySelector('.popup__speciality');

function handleFormSubmit(event) {
  event.preventDefault();

  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle')
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;

  popUp.classList.remove('popup_opened');
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
}
popUpForm.addEventListener('submit', handleFormSubmit);
