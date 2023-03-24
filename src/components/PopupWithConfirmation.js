import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, deleteMyCard) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._formElement.querySelector('.popup__button-delete');
    this._deleteMyCard = deleteMyCard;
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  changeSubmitHandler(handler) {
    this._deleteMyCard = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteMyCard();
    });
  }

  renderLoadingDelete(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Удаление...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}