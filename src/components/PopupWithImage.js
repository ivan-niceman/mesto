import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figurePopUpImage = this._popup.querySelector('.popup__image-figure');
    this._namePopUpImage = this._popup.querySelector('.popup__image-name');
  }

  open(value) {
    super.open();
    this._figurePopUpImage.src = value.link;
    this._figurePopUpImage.alt = value.name;
    this._namePopUpImage.textContent = value.name;
  }
}
