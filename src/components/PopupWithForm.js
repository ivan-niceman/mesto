import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputLists = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._data = {};
    this._inputLists.forEach(input => {
      this._data[input.name] = input.value;
    })
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
      this._popupForm.reset();
    })
  }

  close() {
    // this._popupForm.reset();
    super.close();
  }
}
