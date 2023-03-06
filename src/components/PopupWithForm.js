import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
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
      this.close();
    })
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
