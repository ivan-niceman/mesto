const editButton = document.querySelector('.profile__button-edit');
const popUp = document.querySelector('.popup');
const popUpClose = document.querySelector('.popup__button-close');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popUpForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const specialityInput = document.querySelector('.popup__input_speciality');
const popUpInput = document.querySelectorAll('.popup__input');

function inputReturn() {
  nameInput.value = profileTitle.textContent;
  specialityInput.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', function(){
  popUp.classList.add('popup_opened');
  inputReturn()
})
popUpClose.addEventListener('click', function(){
  popUp.classList.remove('popup_opened');
  inputReturn();
})
// popUp.addEventListener('click', function(element){
//   if(element.target == element.currentTarget) {
//     popUp.classList.remove('popup_opened');
//     inputReturn();
//   }
// })

function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = specialityInput.value;
  popUp.classList.remove('popup_opened');
}
popUpForm.addEventListener('submit', handleFormSubmit);
