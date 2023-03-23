import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__button-save');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    })
  }

  renderLoadingSave(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
